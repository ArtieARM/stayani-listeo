<?php
// dokan functionality
add_action('wp_enqueue_scripts', 'listeo_dokan_child_dequeue_scripts', 30);
add_action('admin_enqueue_scripts', 'listeo_dokan_child_dequeue_scripts', 30);

function listeo_dokan_child_dequeue_scripts()
{
    wp_dequeue_style('dokan-fontawesome');
    wp_dequeue_style('dokan-fontawesome-css');
    wp_dequeue_style('dokan-follow-store');
    wp_dequeue_style('dokan-select2-css');
    wp_dequeue_script('dokan-select2-js');
    //  wp_dequeue_script('dokan-script');
    wp_dequeue_script('dokan-admin-notice-js');
    wp_dequeue_script('dokan-magnific-popup');
    wp_dequeue_script('dokan-promo-notice-js');
    //dokan-select2-js
}


add_filter('woocommerce_product_tabs', 'dokan_remove_seller_info_tab', 50);
function dokan_remove_seller_info_tab($array)
{
    unset($array['seller']);
    return $array;
}

//dokan_geolocation_product_dropdown_categories_args
function listeo_exclude_dokan_listing_booking($query_vars)
{

    $query_vars[] = array(
        'taxonomy' => 'product_cat',
        'field' => 'slug',
        'terms' => array('listeo-booking'), // Don't display products in the clothing category on the shop page.
        'operator' => 'NOT IN'
    );
    $query_vars[] = array(
        'taxonomy' => 'product_type',
        'field' => 'slug',
        'terms' => array('listing_package'), // Don't display products in the clothing category on the shop page.
        'operator' => 'NOT IN'
    );


    return $query_vars;
}
add_filter('dokan_store_tax_query', 'listeo_exclude_dokan_listing_booking', 10);

add_filter('dokan_load_hamburger_menu', '__return_false');
add_filter('dokan_dashboard_nav_common_link', '__return_false');
add_filter('dokan_force_page_redirect', '__return_false');


add_filter('dokan_best_selling_products_query', 'listeo_dokan_best_selling_products_query');
add_filter('dokan_all_products_query', 'listeo_dokan_best_selling_products_query');
function listeo_dokan_best_selling_products_query($args)
{
    $args['tax_query'][] = array(
        'taxonomy' => 'product_cat',
        'field' => 'slug',
        'terms' => array('listeo-booking'), // Don't display products in the clothing category on the shop page.
        'operator' => 'NOT IN'
    );
    $args['tax_query'][] = array(
        'taxonomy' => 'product_type',
        'field' => 'slug',
        'terms' => array('listing_package'), // Don't display products in the clothing category on the shop page.
        'operator' => 'NOT IN'
    );

    return $args;
}

//remove_action('dokan_store_profile_frame_after', 'store_products_orderby');
remove_action('login_init', 'dokan_redirect_to_register');


function listeo_dokan_get_more_products_from_seller($seller_id = 0, $posts_per_page = 6)
{
    global $product, $post;

    if ($seller_id === 0 || 'more_seller_product' === $seller_id) {
        $seller_id = $post->post_author;
    }

    if (!is_int($posts_per_page)) {
        $posts_per_page = apply_filters('dokan_get_more_products_per_page', 6);
    }

    $args = [
        'post_type'      => 'product',
        'posts_per_page' => $posts_per_page,
        'orderby'        => 'rand',
        'post__not_in'   => [$post->ID],
        'author'         => $seller_id,
    ];
    $args['tax_query'][] = array(
        'taxonomy' => 'product_cat',
        'field' => 'slug',
        'terms' => array('listeo-booking'), // Don't display products in the clothing category on the shop page.
        'operator' => 'NOT IN'
    );
    $args['tax_query'][] = array(
        'taxonomy' => 'product_type',
        'field' => 'slug',
        'terms' => array('listing_package'), // Don't display products in the clothing category on the shop page.
        'operator' => 'NOT IN'
    );


    $products = new WP_Query($args);

    if ($products->have_posts()) {
        woocommerce_product_loop_start();

        while ($products->have_posts()) {
            $products->the_post();
            wc_get_template_part('content', 'product');
        }

        woocommerce_product_loop_end();
    } else {
        esc_html_e('No product has been found!', 'dokan-lite');
    }

    wp_reset_postdata();
}

remove_action('woocommerce_product_tabs', 'dokan_set_more_from_seller_tab', 10);
/**
 * Set More products from seller tab
 * On Single Product Page
 *
 * @param array $tabs
 *
 * @since 2.5
 * @return int
 */
function listeo_dokan_set_more_from_seller_tab($tabs)
{
    if (check_more_seller_product_tab()) {
        $tabs['more_seller_product'] = [
            'title'    => __('More Products', 'listeo'),
            'priority' => 99,
            'callback' => 'listeo_dokan_get_more_products_from_seller',
        ];
    }

    return $tabs;
}


add_action('woocommerce_product_tabs', 'listeo_dokan_set_more_from_seller_tab', 10);



function my_categories_widget_register()
{
    unregister_widget('WeDevs\Dokan\Widgets\StoreCategoryMenu');
    register_widget('WeDevs\Dokan\Widgets\StoreCategoryMenu2');
}
add_action('widgets_init', 'my_categories_widget_register');


 
function listeo_dokan_product_cat_dropdown_args($args){
    $exluded = get_option('listeo_dokan_exclude_categories');   
    if(is_array($exluded)){
        $category =  implode(',', $exluded);
        $args['exclude'] = $category;
    }
    
    return $args;
}
add_filter('dokan_product_cat_dropdown_args', 'listeo_dokan_product_cat_dropdown_args', 10);
add_filter('dokan_geolocation_product_dropdown_categories_args', 'listeo_dokan_product_cat_dropdown_args', 10);
add_filter('woocommerce_product_categories_widget_dropdown_args', 'listeo_dokan_product_cat_dropdown_args', 10);
add_filter('woocommerce_product_categories_widget_args', 'listeo_dokan_product_cat_dropdown_args', 10);



add_filter(
    'woocommerce_products_widget_query_args',
    function ($query_args) {
        // Set HERE your product category slugs 
        $exluded = get_option('listeo_dokan_exclude_categories');
        if (is_array($exluded)) {
            $query_args['tax_query'] = array(array(
                'taxonomy' => 'product_cat',
                'field'    => 'id',
                'terms'    => $exluded,
                'operator' => 'NOT IN'
            ));
        }
        return $query_args;
    },
    10,
    1
);


add_filter('dokan_category_widget', function ($args) {
    // ID of the category to exclude

    $exluded = get_option('listeo_dokan_exclude_categories');
    
    if (is_array($exluded)) {
        $args['exclude'] = $exluded;
        return $args;
    }

    return $args;
});
?>