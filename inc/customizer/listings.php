<?php 



listeo_Kirki::add_section( 'listings_list', array(
	    'title'          => esc_html__( 'Listings List Options', 'listeo'  ),
	    'description'    => esc_html__( 'Archive page related options', 'listeo'  ),
	   // 'panel'          => 'listings_panel', // Not typically needed.
	    'priority'       => 12,
	    'capability'     => 'edit_theme_options',
	    'theme_supports' => '', // Rarely needed.
	) );

	listeo_Kirki::add_field( 'listeo', array(
	    'type'        => 'number',
	    'settings'    => 'listeo_listings_per_page',
	    'label'       => esc_html__( 'Listings per page', 'listeo' ),
	    'default'     => '10',
	    'section'     => 'listings_list',
	    'priority'    => 10,
	    'default'     => 10,
		'choices'     => array(
			'min'  => 0,
			'max'  => 150,
			'step' => 1,
		),
	) );

	listeo_Kirki::add_field( 'listeo', array(
	    'type'        => 'number',
	    'settings'    => 'listeo_author_listings_per_page',
	    'label'       => esc_html__( 'Author archive listings per page', 'listeo' ),
	    'default'     => '3',
	    'section'     => 'listings_list',
	    'priority'    => 10,
	    'default'     => 3,
		'choices'     => array(
			'min'  => 0,
			'max'  => 50,
			'step' => 1,
		),
	) );

listeo_Kirki::add_field('listeo', array(
	'settings'    => 'listeo_show_archive_title',
	'label'		  => 'Show archive title ',
	'description' => esc_html__('Show archive title above list of listings', 'listeo'),
	'section'     => 'listings_list',
	'type'        => 'radio',
	'default'     => 'disable',
	'priority'    => 10,
	'choices'     => array(
		'enable'  => esc_attr__('Enable', 'listeo'),
		'disable' => esc_attr__('Disable', 'listeo'),
	),

));  
	listeo_Kirki::add_field( 'listeo', array(
	    'type'        => 'text',
	    'settings'    => 'listeo_listings_archive_title',
	    'label'       => esc_html__( 'Listings archive title', 'listeo' ),
	    'default'     => 'Listings',
	    'section'     => 'listings_list',
	    'priority'    => 10,
	) );

	listeo_Kirki::add_field( 'listeo', array(
	    'type'        => 'text',
	    'settings'    => 'listeo_listings_archive_subtitle',
	    'label'       => esc_html__( 'Listings archive subtitle', 'listeo' ),
	    'default'     => 'Latest Listings',
	    'section'     => 'listings_list',
	    'priority'    => 10,
	) );

  	listeo_Kirki::add_field( 'listeo', array(
	    'type'        => 'radio',
	    'settings'    => 'listeo_rating_type',
	    'label'       => esc_html__( 'Choose rating display style on listings', 'listeo' ),
	    'description' => esc_html__( 'Stars or colored numbers', 'listeo' ),
	    'section'     => 'listings_list',
	    'default'     => 'stars',
	    'priority'    => 10,
	    'choices'     => array(
	       'stars' 		=> esc_attr__( 'Stars', 'listeo' ),
	       'numerical' 		=> esc_attr__( 'Numerical', 'listeo' ),
	      
 		),	
	));
	
	listeo_Kirki::add_field( 'listeo', array(
	    'type'        => 'select',
	    'settings'    => 'listeo_price_filter_icon',
	    'label'       => esc_html__( 'Choose Price filter tag icon', 'listeo' ),
	    'description' => esc_html__( 'Choose the icon for your currency', 'listeo' ),
	    'section'     => 'listings_list',
	    'default'     => 'tag',
	    'priority'    => 10,
	    'choices'     => array(
	       'tag' 		=> esc_attr__( 'Tag', 'listeo' ),
	       'dollar' 	=> esc_attr__( 'Dollar', 'listeo' ),
	       'euro' 		=> esc_attr__( 'Euro', 'listeo' ),
	       'gbp' 		=> esc_attr__( 'GBP', 'listeo' ),
	       'ruble' 		=> esc_attr__( 'Ruble', 'listeo' ),
	       'turkish-lira' 		=> esc_attr__( 'Turkish lira', 'listeo' ),
	       'rupee' 		=> esc_attr__( 'Rupee', 'listeo' ),
	       'won' 		=> esc_attr__( 'Won', 'listeo' ),
	       'shekel' 		=> esc_attr__( 'Shekel', 'listeo' ),
	       'krw' 		=> esc_attr__( 'KRW', 'listeo' ),


 		),	
	));

	listeo_Kirki::add_field( 'listeo', array(
	    'type'        => 'select',
	    'settings'    => 'listeo_marker_no_icon',
	    'label'       => esc_html__( 'Map listing marker style', 'listeo' ),
	    'description' => esc_html__( 'Choose the general marker style for all maps', 'listeo' ),
	    'section'     => 'listings_list',
	    'default'     => 'icon',
	    'priority'    => 10,
	    'choices'     => array(
	       'icon' 		=> esc_attr__( 'With Icons', 'listeo' ),
	       'no_icon' 		=> esc_attr__( 'No Icon', 'listeo' ),
	       
 		),	
	));
	listeo_Kirki::add_field( 'listeo', array(
	    'type'        => 'select',
	    'settings'    => 'pp_listings_top_layout',
	    'label'       => esc_html__( 'Listings archive general layout', 'listeo' ),
	    'description' => esc_html__( 'Choose the general archive  layout', 'listeo' ),
	    'section'     => 'listings_list',
	    'default'     => 'list_with_sidebar',
	    'priority'    => 10,
	    'choices'     => array(
	       'titlebar' 		=> esc_attr__( 'Standard titlebar', 'listeo' ),
	       'search' 		=> esc_attr__( 'Full width search form', 'listeo' ),
	       'map_searchform' => esc_attr__( 'Map with search form', 'listeo' ),
	       'map' 			=> esc_attr__( 'Map on top', 'listeo' ),
	       'half' 			=> esc_attr__( 'Split Map/Content', 'listeo' ),
		    'halfsidebar' 	=> esc_attr__( 'Split Map/Content with sidebar', 'listeo' ),
	       'disable' 		=> esc_attr__( 'Disable titlebar', 'listeo' ),
 		),	
	));

	// slider visbility
	listeo_Kirki::add_field( 'listeo', array(
	    'type'        => 'select',
	    'settings'    => 'pp_listings_split-sidebar-status',
	    'label'       => esc_html__('Split Sidebar visibility', 'listeo' ),
	    'description' => esc_html__( 'Default visibility for sidebar', 'listeo' ),
	    'section'     => 'listings_list',
	    'default'     => 'hide',
	    'priority'    => 10,
	    'choices'     => array(
	       	'hide' 		=> esc_attr__( 'Hidden by default', 'listeo' ),
			'show' 		=> esc_attr__('Visible by default', 'listeo'),
 		),	
		'active_callback'  => array(
			array(
				'setting'  => 'pp_listings_top_layout',
				'operator' => '==',
				'value'    => 'halfsidebar',
			),
		),
	));
	listeo_Kirki::add_field( 'listeo', array(
	    'type'        => 'select',
	    'settings'    => 'pp_listings_split-categories-slider-options',
	    'label'       => esc_html__('Categories Slider Options', 'listeo' ),
	    'description' => esc_html__( 'Show/hide the categories slider over the list', 'listeo' ),
	    'section'     => 'listings_list',
	    'default'     => 'list',
	    'priority'    => 10,
	    'choices'     => array(
	       'disable' 		=> esc_attr__( 'Disable', 'listeo' ),
	       'show_all' 		=> esc_attr__( 'Show all', 'listeo' ),
	       'show_nonempty' 		=> esc_attr__( 'Show only non empty categories', 'listeo' ),
	       'show_preselected' 		=> esc_attr__( 'Show preselected categories', 'listeo' ),
 		),
	'active_callback'  => array(
		array(
			'setting'  => 'pp_listings_top_layout',
			'operator' => '==',
			'value'    => 'halfsidebar',
		),
	),
	));
if(function_exists('listeo_get_categories_for_slider')) {
	// add list of categories to shw in the slider if 'show_preselected' is selected
	listeo_Kirki::add_field( 'listeo', array(
	    'type'        => 'multicheck',
	    'settings'    => 'pp_listings_split-categories-slider',
	    'label'       => esc_html__( 'Categories to show in the slider', 'listeo' ),
	    'description' => esc_html__( 'Select categories to show in the slider', 'listeo' ),
	    'section'     => 'listings_list',
	    'default'     => '',
	    'priority'    => 10,
	    'choices'     => listeo_get_categories_for_slider(),
 	    'active_callback'  => array(
			array(
				'setting'  => 'pp_listings_split-categories-slider-options',
				'operator' => '==',
				'value'    => 'show_preselected',
			),
		),
	));

}

	listeo_Kirki::add_field( 'listeo', array(
	    'type'        => 'select',
	    'settings'     => 'pp_listings_layout',
	    'label'       => esc_html__( 'Listings content layout', 'listeo' ),
	    'description' => esc_html__( 'Choose the general archive content  layout', 'listeo' ),
	    'section'     => 'listings_list',
	    'default'     => 'list',
	    'priority'    => 10,
	    'choices'     => array(
	       	'list' 		=> esc_attr__( 'List', 'listeo' ),
	       	'grid' 		=> esc_attr__( 'Grid', 'listeo' ),
			'compact' 	=> esc_attr__('Grid Compact', 'listeo'),
			'list_old' 		=> esc_attr__('List Classic', 'listeo'),
			'grid_old' 		=> esc_attr__('Grid Classic', 'listeo'),

 		),	
	));

	// if layout is grid or list, show option to disable or enable the slider in gallery preview
	listeo_Kirki::add_field( 'listeo', array(
	    'type'        => 'radio',
	    'settings'    => 'listeo_listings_gallery_slider',
	    'label'       => esc_html__( 'Gallery slider', 'listeo' ),
	    'description' => esc_html__( 'Enable or disable the slider in gallery preview', 'listeo' ),
	    'section'     => 'listings_list',
	    'default'     => 'enable',
	    'priority'    => 10,
	    'choices'     => array(
	       'enable' 		=> esc_attr__( 'Enable', 'listeo' ),
	       'disable' 		=> esc_attr__( 'Disable', 'listeo' ),
	       
 		),	
		'active_callback'  => array(
			array(
				'setting'  => 'pp_listings_layout',
				'operator' => 'in',
				'value'    => array('grid', 'list'),
			),
		),
	));

	// add option to set number of categories to show in listing item
	listeo_Kirki::add_field( 'listeo', array(
	    'type'        => 'number',
	    'settings'    => 'listeo_listings_categories_number',
	    'label'       => esc_html__( 'Number of categories to show in listing item', 'listeo' ),
	    'description' => esc_html__( 'Set number of categories to show in listing item', 'listeo' ),
	    'section'     => 'listings_list',
	    'default'     => 3,
	    'priority'    => 10,
		'choices'     => array(
			'min'  => 0,
			'max'  => 10,
			'step' => 1,
		),
	));

	// add option to limit number of ammenities to show in listing item
	listeo_Kirki::add_field( 'listeo', array(
	    'type'        => 'number',
	    'settings'    => 'listeo_listings_features_number',
	    'label'       => esc_html__( 'Number of features to show in listing item', 'listeo' ),
	    'description' => esc_html__( 'Set number of features to show in listing item', 'listeo' ),
	    'section'     => 'listings_list',
	    'default'     => 10,
	    'priority'    => 10,
		'choices'     => array(
			'min'  => 0,
			'max'  => 20,
			'step' => 1,
		),
	));

// add field for which of the sort by options are available to turn them on/off
listeo_Kirki::add_field('listeo', array(
	'settings'    => 'listeo_listings_list_items',
	'label'		  => 'Select elements to show on list/grid items',
	'description' => esc_html__('Choose which elements are shown on listings list items', 'listeo'),
	'section'     => 'listings_list',
	'type'        => 'multicheck',
	'default'     =>  array('category', 'bookmark', 'location', 'customfields', 'features', 'open_now'),
	'priority'    => 10,
	'choices'     => array(

		'category' => esc_attr__('Listing Category', 'listeo'),
		'bookmark' => esc_attr__('Bookmark', 'listeo'),
		'location' => esc_attr__('Listing Location', 'listeo'),
		'customfields' => esc_attr__('Custom Fields', 'listeo'),
		'features' => esc_attr__('Features', 'listeo'),
		'open_now' => esc_attr__('Open Now badge', 'listeo'),
		'price' => esc_attr__('Price', 'listeo'),
		'excerpt' => esc_attr__('Excerpt', 'listeo'),

	),


));


	listeo_Kirki::add_field( 'listeo', array(
	    'type'        => 'radio-image',
	    'settings'    => 'pp_listings_sidebar_layout',
	    'label'       => esc_html__( 'Sidebar side', 'listeo' ),
	    'description' => esc_html__( 'Applies if the choosen layout has sidebar', 'listeo' ),
	    'section'     => 'listings_list',
	    'default'     => 'right-sidebar',
	    'priority'    => 10,
	    'choices'     => array(
	        'full-width' 	=> trailingslashit( trailingslashit( get_template_directory_uri() )) . '/images/full-width.png',
	        'left-sidebar' 	=> trailingslashit( trailingslashit( get_template_directory_uri() )) . '/images/left-sidebar.png',
	        'right-sidebar' => trailingslashit( trailingslashit( get_template_directory_uri() )) . '/images/right-sidebar.png',
	    ),	

	));	

	listeo_Kirki::add_field( 'listeo', array(
	    'type'        => 'radio-image',
	    'settings'    => 'listeo_listings_mobile_layout',
	    'label'       => esc_html__( 'Mobile Layout sidebar side', 'listeo' ),
	    'description' => esc_html__( 'Applies if the choosen layout has sidebar', 'listeo' ),
	    'section'     => 'listings_list',
	    'default'     => 'right-sidebar',
	    'priority'    => 10,
	    'choices'     => array(
	        'left-sidebar' 	=> trailingslashit( trailingslashit( get_template_directory_uri() )) . '/images/left-sidebar.png',
	        'right-sidebar' => trailingslashit( trailingslashit( get_template_directory_uri() )) . '/images/right-sidebar.png',
	    ),	
	    'active_callback'  => array(
            array(
                'setting'  => 'pp_listings_sidebar_layout',
                'operator' => '==',
                'value'    => 'right-sidebar',
            ),

        )

	));


	listeo_Kirki::add_field( 'listeo', array(
		    'type'        => 'image',
		    'settings'     => 'listeo_placeholder_id',
		    'label'       => esc_html__( 'Default Background image for listings if there are no images added', 'listeo' ),
		    'description' => esc_html__( 'Set image for default listing list background', 'listeo' ),
		    'section'     => 'listings_list',
		    'default'     => '',
		    'priority'    => 10,
		 
		) );



	listeo_Kirki::add_field( 'listeo', array(
        'settings'    => 'listeo_listings_top_buttons',
        'label'		  => 'Top Buttons ',
        'description' => esc_html__( 'Show additional buttons before listings', 'listeo' ),
        'section'     => 'listings_list',
        'type'        => 'radio',
		'default'     => 'disable',
		'priority'    => 10,
		'choices'     => array(
			'enable'  => esc_attr__( 'Enable', 'listeo' ),
			'disable' => esc_attr__( 'Disable', 'listeo' ),
		),
		
    ) );  
    listeo_Kirki::add_field( 'listeo', array(
        'settings'    => 'listeo_listings_top_buttons_conf',
        'label'		  => 'Top Buttons configuration',
        'description' => esc_html__( 'Function buttons configuration', 'listeo' ),
        'section'     => 'listings_list',
        'type'        => 'multicheck',
		'default'     => '',
		'priority'    => 10,
		'choices'     => array(
			'layout'  	=> esc_attr__( 'List/Grid (works only with Ajax)', 'listeo' ),
			'filters' 	=> esc_attr__( 'Features panel filter', 'listeo' ),
			'radius' 	=> esc_attr__( 'Radius slider', 'listeo' ),
			'order' 	=> esc_attr__( 'Orderby dropdown', 'listeo' ),
		),
		'active_callback'  => array(
            array(
                'setting'  => 'listeo_listings_top_buttons',
                'operator' => '==',
                'value'    => 'enable',
            ),
           
        
        )
	
    ) );  


	// add field for which of the sort by options are available to turn them on/off
	listeo_Kirki::add_field( 'listeo', array(
		'settings'    => 'listeo_listings_sortby_options',
		'label'		  => 'Sort by options',
		'description' => esc_html__( 'Choose which sort by options are available', 'listeo' ),
		'section'     => 'listings_list',
		'type'        => 'multicheck',
		'default'     =>  array('highest-rated', 'reviewed', 'date-desc', 'date-asc', 'title', 'featured', 'views', 'verified', 'upcoming-event', 'rand'),
		'priority'    => 10,
		'choices'     => array(

			'highest-rated' => esc_attr__( 'Highest Rated', 'listeo' ),
			'reviewed' => esc_attr__( 'Most Reviewed', 'listeo' ),
			'date-desc' => esc_attr__( 'Newest Listings', 'listeo' ),
			'date-asc' => esc_attr__( 'Oldest Listings', 'listeo' ),
			'title' => esc_attr__( 'Alphabetically', 'listeo' ),
			'featured' => esc_attr__( 'Featured', 'listeo' ),
			'views' => esc_attr__( 'Most Views', 'listeo' ),
			'verified' => esc_attr__( 'Verified', 'listeo' ),
			'upcoming-event' => esc_attr__( 'Upcoming Event', 'listeo' ),
			'rand' => esc_attr__( 'Random', 'listeo' ),

			
		),
		'active_callback'  => array(
			array(
				'setting'  => 'listeo_listings_top_buttons_conf',
				'operator' => 'in',
				'value'    => 'order',
			),
		   
		
		)
	
	) );
	

	listeo_Kirki::add_section( 'listing_single', array(
	    'title'          => esc_html__( 'Single Listing Options', 'listeo'  ),
	    'description'    => esc_html__( 'Options for single listing layout', 'listeo'  ),
	   // 'panel'          => 'listings_panel', // Not typically needed.
	    'priority'       => 12,
	    'capability'     => 'edit_theme_options',
	    'theme_supports' => '', // Rarely needed.
	) );
	listeo_Kirki::add_field( 'listeo', array(
	   'type'        => 'radio-image',
	    //'type'        => 'radio',
	    'settings'    => 'listeo_single_layout',
	    'label'       => esc_html__( 'Sidebar side', 'listeo' ),
	    'description' => esc_html__( 'Applies if the choosen layout has sidebar', 'listeo' ),
	    'section'     => 'listing_single',
	    'default'     => 'right-sidebar',
	    'priority'    => 10,
	    'choices'     => array(
	        'left-sidebar' 	=> trailingslashit( trailingslashit( get_template_directory_uri() )) . '/images/left-sidebar.png',
	        'right-sidebar' => trailingslashit( trailingslashit( get_template_directory_uri() )) . '/images/right-sidebar.png',
	    ),	
	));	
	

	listeo_Kirki::add_field( 'listeo', array(
	    'type'        => 'radio-image',
	    'settings'    => 'listeo_single_mobile_layout',
	    'label'       => esc_html__( 'Mobile layout sidebar side', 'listeo' ),
	    'description' => esc_html__( 'Applies if the choosen layout has sidebar', 'listeo' ),
	    'section'     => 'listing_single',
	    'default'     => 'right-sidebar',
	    'priority'    => 10,
	    'choices'     => array(
	        'left-sidebar' 	=> trailingslashit( trailingslashit( get_template_directory_uri() )) . '/images/left-sidebar.png',
	        'right-sidebar' => trailingslashit( trailingslashit( get_template_directory_uri() )) . '/images/right-sidebar.png',
	    ),	
	    'active_callback'  => array(
            array(
                'setting'  => 'listeo_single_layout',
                'operator' => '==',
                'value'    => 'right-sidebar',
            ),

        )
	
	));

	// Mobile Map Collapsible Option
	listeo_Kirki::add_field( 'listeo', array(
		'type'        => 'radio',
		'settings'    => 'listeo_mobile_map_collapsible',
		'label'       => esc_html__( 'Mobile Map Behavior', 'listeo' ),
		'description' => esc_html__( 'Choose how the map behaves on mobile devices in search results pages', 'listeo' ),
		'section'     => 'listings_list',
		'default'     => 'default',
		'priority'    => 15,
		'choices'     => array(
			'default'     => esc_attr__( 'Default (always visible)', 'listeo' ),
			'collapsible' => esc_attr__( 'Collapsible (starts collapsed)', 'listeo' ),
			'hidden'      => esc_attr__( 'Hidden on mobile', 'listeo' ),
		),	
	));

	
 ?>