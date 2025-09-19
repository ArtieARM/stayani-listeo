<?php
$post_id = $post->ID;

// Use our helper function to get gallery data
$gallery_data = function_exists('lds_get_listing_gallery') ? lds_get_listing_gallery($post_id) : [];

// If no LDS gallery data, fall back to original method
if (empty($gallery_data)) {
    $gallery = get_post_meta($post_id, '_gallery', true);
    if (!empty($gallery)) {
        foreach ($gallery as $attachment_id => $url) {
            $gallery_data[] = [
                'url' => wp_get_attachment_image_url($attachment_id, 'listeo-gallery'),
                'id' => $attachment_id,
                'source' => 'wordpress',
                'attribution' => ''
            ];
        }
    }
}

if (empty($gallery_data)) {
    return;
}

$count_gallery = count($gallery_data);
$is_google = (isset($gallery_data[0]['source']) && $gallery_data[0]['source'] === 'google');

// Get thumbnail
$thumbnail_url = '';
$thumbnail_id = get_post_thumbnail_id($post_id);

if (has_post_thumbnail($post_id)) {
    $thumbnail_url = get_the_post_thumbnail_url($post_id, 'listeo-gallery');
} elseif (!empty($gallery_data)) {
    $thumbnail_url = $gallery_data[0]['url'];
}

// Reorder gallery to put thumbnail first if it exists in gallery
if ($thumbnail_id && !$is_google) {
    $thumbnail_index = -1;
    foreach ($gallery_data as $index => $photo) {
        if ($photo['id'] == $thumbnail_id) {
            $thumbnail_index = $index;
            break;
        }
    }
    
    if ($thumbnail_index > 0) {
        $thumbnail_photo = $gallery_data[$thumbnail_index];
        unset($gallery_data[$thumbnail_index]);
        array_unshift($gallery_data, $thumbnail_photo);
        $gallery_data = array_values($gallery_data); // Reset keys
    }
}

// Create popup gallery array for compatibility
$popup_gallery = array();
foreach ($gallery_data as $photo) {
    $popup_gallery[] = $photo['url'];
}
?>

<div class="row">
    <div class="col-md-12">
        <div class="listeo-single-listing-gallery-grid">
            <div id="single-listing-grid-gallery" <?php if ($count_gallery == 1) echo 'class="slg-one-photo"'; ?>>
                <?php
                if ($count_gallery == 1) {
                    echo '<a href="' . esc_url($gallery_data[0]['url']) . '" class="mfp-image slg-gallery-img-single">';
                    echo '<img src="' . esc_url($gallery_data[0]['url']) . '" />';
                    if (!empty($gallery_data[0]['attribution'])) {
                        echo '<div class="photo-attribution" style="position: absolute; bottom: 5px; right: 5px; background: rgba(0,0,0,0.7); color: white; padding: 2px 5px; font-size: 10px;">' . wp_kses_post(implode(' ', $gallery_data[0]['attribution'])) . '</div>';
                    }
                    echo '</a>';
                }
                
                if ($count_gallery > 1) { ?>
                    <a href="#" id="single-listing-grid-gallery-popup" data-gallery="<?php echo esc_attr(json_encode($popup_gallery)); ?>" data-gallery-count="<?php echo esc_attr($count_gallery); ?>" class="slg-button"><i class="sl sl-icon-grid"></i> <?php esc_html_e('Show All Photos', 'listeo_core') ?></a>
                    
                    <div class="slg-half">
                        <a data-grid-start-index="0" href="<?php echo esc_url($gallery_data[0]['url']); ?>" class="slg-gallery-img">
                            <img src="<?php echo esc_url($gallery_data[0]['url']); ?>" />
                            <?php if (!empty($gallery_data[0]['attribution'])): ?>
                                <div class="photo-attribution" style="position: absolute; bottom: 5px; right: 5px; background: rgba(0,0,0,0.7); color: white; padding: 2px 5px; font-size: 10px;">
                                    <?php echo wp_kses_post(implode(' ', $gallery_data[0]['attribution'])); ?>
                                </div>
                            <?php endif; ?>
                        </a>

                    <?php
                    // === Avatar overlay (single page, main big photo) ===
                    $owner_id    = (int) get_post_field('post_author', $post_id);
                    $profile_url = get_author_posts_url($owner_id);

                    $avatar_html = get_avatar(
                        $owner_id,
                        80,
                        '',
                        '',
                        array(
                            'class'    => 'avatar-img',
                            'loading'  => 'lazy',
                            'decoding' => 'async'
                        )
                    );

                    if (empty($avatar_html)) {
                        $custom = get_user_meta($owner_id, 'listeo_user_avatar', true);
                        if (!empty($custom)) {
                            $avatar_html = sprintf(
                                '<img class="avatar-img" src="%s" alt="%s" width="80" height="80" loading="lazy" decoding="async" />',
                                esc_url($custom),
                                esc_attr(get_the_author_meta('display_name', $owner_id))
                            );
                        }
                    }
                    ?>

                    <?php if (!empty($avatar_html)) : ?>
                        <div class="listing-owner-avatar gallery-avatar" id="main-photo-avatar">
                            <a href="<?php echo esc_url($profile_url); ?>" class="avatar-link"
                               aria-label="<?php echo esc_attr(get_the_author_meta('display_name', $owner_id)); ?>">
                                <?php echo $avatar_html; ?>
                            </a>
                        </div>
                    <?php endif; ?>


                    </div>
                    
                    <?php if ($count_gallery > 2) { ?>
                        <div class="slg-half">
                            <div class="slg-grid">
                                <div class="slg-grid-top">
                                    <?php if ($count_gallery >= 3) { ?>
                                        <div class="slg-grid-inner">
                                            <a data-grid-start-index="1" href="<?php echo esc_url($gallery_data[1]['url']); ?>" class="slg-gallery-img">
                                                <img src="<?php echo esc_url($gallery_data[1]['url']); ?>" />
                                                <?php if (!empty($gallery_data[1]['attribution'])): ?>
                                                    <div class="photo-attribution" style="position: absolute; bottom: 2px; right: 2px; background: rgba(0,0,0,0.7); color: white; padding: 1px 3px; font-size: 8px;">
                                                        <?php echo wp_kses_post(implode(' ', $gallery_data[1]['attribution'])); ?>
                                                    </div>
                                                <?php endif; ?>
                                            </a>
                                        </div>
                                    <?php } ?>
                                    <?php if ($count_gallery >= 4) { ?>
                                        <div class="slg-grid-inner">
                                            <a data-grid-start-index="3" href="<?php echo esc_url($gallery_data[3]['url']); ?>" class="slg-gallery-img">
                                                <img src="<?php echo esc_url($gallery_data[3]['url']); ?>" />
                                                <?php if (!empty($gallery_data[3]['attribution'])): ?>
                                                    <div class="photo-attribution" style="position: absolute; bottom: 2px; right: 2px; background: rgba(0,0,0,0.7); color: white; padding: 1px 3px; font-size: 8px;">
                                                        <?php echo wp_kses_post(implode(' ', $gallery_data[3]['attribution'])); ?>
                                                    </div>
                                                <?php endif; ?>
                                            </a>
                                        </div>
                                    <?php } ?>
                                </div>
                                <div class="slg-grid-bottom">
                                    <?php if ($count_gallery >= 3) { ?>
                                        <div class="slg-grid-inner">
                                            <a data-grid-start-index="2" href="<?php echo esc_url($gallery_data[2]['url']); ?>" class="slg-gallery-img">
                                                <img src="<?php echo esc_url($gallery_data[2]['url']); ?>" />
                                                <?php if (!empty($gallery_data[2]['attribution'])): ?>
                                                    <div class="photo-attribution" style="position: absolute; bottom: 2px; right: 2px; background: rgba(0,0,0,0.7); color: white; padding: 1px 3px; font-size: 8px;">
                                                        <?php echo wp_kses_post(implode(' ', $gallery_data[2]['attribution'])); ?>
                                                    </div>
                                                <?php endif; ?>
                                            </a>
                                        </div>
                                    <?php } ?>
                                    <?php if ($count_gallery >= 5) { ?>
                                        <div class="slg-grid-inner">
                                            <a data-grid-start-index="4" href="<?php echo esc_url($gallery_data[4]['url']); ?>" class="slg-gallery-img">
                                                <img src="<?php echo esc_url($gallery_data[4]['url']); ?>" />
                                                <?php if (!empty($gallery_data[4]['attribution'])): ?>
                                                    <div class="photo-attribution" style="position: absolute; bottom: 2px; right: 2px; background: rgba(0,0,0,0.7); color: white; padding: 1px 3px; font-size: 8px;">
                                                        <?php echo wp_kses_post(implode(' ', $gallery_data[4]['attribution'])); ?>
                                                    </div>
                                                <?php endif; ?>
                                            </a>
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                        </div>
                    <?php } else {
                        // count gallery equals 2 
                    ?>
                        <div class="slg-half">
                            <a data-grid-start-index="1" href="<?php echo esc_url($gallery_data[1]['url']); ?>" class="slg-gallery-img">
                                <img src="<?php echo esc_url($gallery_data[1]['url']); ?>" />
                                <?php if (!empty($gallery_data[1]['attribution'])): ?>
                                    <div class="photo-attribution" style="position: absolute; bottom: 5px; right: 5px; background: rgba(0,0,0,0.7); color: white; padding: 2px 5px; font-size: 10px;">
                                        <?php echo wp_kses_post(implode(' ', $gallery_data[1]['attribution'])); ?>
                                    </div>
                                <?php endif; ?>
                            </a>
                        </div>
                    <?php } ?>
                <?php } ?>
            </div>
        </div>
    </div>
</div>
