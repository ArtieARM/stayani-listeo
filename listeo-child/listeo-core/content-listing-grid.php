<?php
/**
 * Child override: content-listing-grid.php
 * Strategy: Render original Listeo template to a buffer, then post-process:
 *  - remove "No reviews yet"
 *  - if no price block exists, synthesize one from meta or price range helper
 * This keeps compatibility with future updates and AJAX renders.
 */
if ( ! defined('ABSPATH') ) { exit; }

// Find the original template
$plugin_template = WP_PLUGIN_DIR . '/listeo-core/templates/content-listing-grid.php';
$parent_template = get_template_directory() . '/content-listing-grid.php';
$tpl = file_exists($plugin_template) ? $plugin_template : ( file_exists($parent_template) ? $parent_template : '' );

// Render into buffer
ob_start();
if ( $tpl ) { include $tpl; }
$html = ob_get_clean();


// === Stayani post-process: rating "New" + avatar overlay (minimal, safe) ===
if (is_string($html) && $html !== ''){
    // 1) Replace the whole element that contains "No reviews yet" -> our ★ New block
    $newBlock = '<div class="listing-rating-nl listing-rating-new"><div class="stars-nl"><i class="fa-solid fa-star"></i></div><span class="rating-new-label" style="color:#111;font-weight:500;">'.esc_html__('New','listeo_core').'</span></div>';
    // Replace common wrappers containing the phrase
    $html = preg_replace('#<([a-z0-9]+)([^>]*?)>\\s*No\\s+reviews\\s+yet\\s*</\\1>#i', $newBlock, $html, 1);
    // Fallback: if plain text remained, drop it and append our block nearby
    if (stripos($html, 'No reviews yet') !== false){
        $html = str_ireplace('No reviews yet', '', $html);
        // Try to place our block before card closing
        $html = preg_replace('#</div>\\s*</a>\\s*</div>\\s*</div>\\s*$#is', $newBlock.'$0', $html, 1);
    }

    // 2) Ensure "New" is not a link: convert <a class="rating-new-label"> to <span>
    $html = preg_replace(
        '#<a([^>]*class="[^"]*rating-new-label[^"]*"[^>]*)>(.*?)</a>#is',
        '<span class="rating-new-label" style="color:#111;font-weight:500;">$2</span>',
        $html,
        1
    );

    // 3) Avatar overlay: compute and inject into image container
    $post_id    = get_the_ID();
    $owner_id   = (int) get_post_field('post_author', $post_id);
    $profile_url= get_author_posts_url($owner_id);
    $avatarHTML = get_avatar($owner_id, 64, '', '', array('class'=>'avatar-img','loading'=>'lazy','decoding'=>'async'));
    if (empty($avatarHTML)){
        $custom = get_user_meta($owner_id, 'listeo_user_avatar', true);
        if (!empty($custom)){
            $avatarHTML = '<img class="avatar-img" src="'.esc_url($custom).'" alt="'.esc_attr(get_the_author_meta('display_name',$owner_id)).'" width="64" height="64" loading="lazy" decoding="async" />';
        }
    }
    if (!empty($avatarHTML)){
        $overlay = '<div class="listing-owner-avatar"><a href="'.esc_url($profile_url).'" class="avatar-link" aria-label="'.esc_attr(get_the_author_meta('display_name',$owner_id)).'">'.$avatarHTML.'</a></div>';
        $patterns = array(
            '#(<div[^>]+class="[^"]*listing\\-img[^"]*"[^>]*>)#is',
            '#(<div[^>]+class="[^"]*listing\\-image[^"]*"[^>]*>)#is',
            '#(<figure[^>]+class="[^"]*listing[^"]*"[^>]*>)#is',
            '#(<div[^>]+class="[^"]*listing\\-item[^"]*"[^>]*>)#is',
        );
        $ok = false;
        foreach ($patterns as $re){
            $html2 = preg_replace($re, '$1'.$overlay, $html, 1, $count);
            if ($count){
                $html = $html2; $ok = true; break;
            }
        }
        if (!$ok){
            // last resort: append to end (better than nothing)
            $html .= $overlay;
        }
    }
}
// 1) Remove the 'No reviews yet' stub (keeps layout clean)
/* DISABLED to preserve rating */ // $html = preg_replace('#<div class=\"listing-rating-nl\">\s*<div[^>]*class=\"[^\"]*no-rating[^\"]*\"[^>]*>.*?</div>\s*</div>#is', '', $html);
/* DISABLED to preserve rating text when needed */ // $html = str_replace(__('No reviews yet','listeo_core'), '', $html);

// 2) Ensure price is present
if ( strpos($html, 'class="listing-booking-nl"') === false ) {
    $post_id = get_the_ID();
    $listing_type = get_post_meta($post_id, '_listing_type', true);
    $price_html = '';

    if ( $listing_type === 'classifieds' ) {
        $price = get_post_meta($post_id, '_classifieds_price', true);
        if ( $price !== '' && $price !== null ) {
            $currency_abbr    = get_option('listeo_currency');
            $currency_pos     = get_option('listeo_currency_postion');
            $currency_symbol  = class_exists('Listeo_Core_Listing') ? Listeo_Core_Listing::get_currency_symbol($currency_abbr) : '';
            if ( is_numeric($price) ) {
                $formatted = number_format_i18n((float)$price, 0);
                $price_text = ($currency_pos === 'before') ? ($currency_symbol.$formatted) : ($formatted.$currency_symbol);
            } else {
                $price_text = esc_html($price);
            }
            $price_html = '<div class="listing-booking-nl"><p class="price-nl">'. $price_text .'</p></div>';
        }
    } else {
        if ( function_exists('get_the_listing_price_range') ) {
            $range = get_the_listing_price_range();
            if ( $range ) {
                $price_html = '<div class="listing-booking-nl"><p class="price-nl">'. $range .'</p></div>';
            }
        }
    }

    if ( $price_html ) {
        // Inject price just before the closing of ".listing-card-nl" or at the end if not found
        $injected = false;
        $html = preg_replace_callback('#</div>\s*</a>\s*</div>\s*</div>\s*$#is', function($m) use ($price_html, &$injected){
            $injected = true;
            return $price_html . $m[0];
        }, $html, 1);

        if ( ! $injected ) {
            $html .= $price_html;
        }
    }
}

// Output the final markup
echo $html;
