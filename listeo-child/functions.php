<?php 
add_action( 'wp_enqueue_scripts', 'listeo_enqueue_styles' );
function listeo_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css',array('bootstrap','font-awesome-5','font-awesome-5-shims','simple-line-icons','listeo-woocommerce') );

}


 
function remove_parent_theme_features() {
   	
}
add_action( 'after_setup_theme', 'remove_parent_theme_features', 10 );



?>

<?php
// soubor: wp-content/themes/tvoje-child/functions.php

add_action( 'wp_enqueue_scripts', 'tvoje_child_enqueue_scripts', 20 );
function tvoje_child_enqueue_scripts() {
    wp_enqueue_script(
        'stayani-js',                                   // handle
        get_stylesheet_directory_uri() . '/js/stayani.js', // cesta k souboru
        array( 'jquery' ),                              // závislosti (dle potřeby)
        '1.0',                                          // verze
        true                                            // načíst v patičce
    );
}
