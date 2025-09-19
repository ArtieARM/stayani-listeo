<?php
if (isset($data) && isset($data->size)) {
    $size = $data->size;
} else {
    $size = 'listeo-listing-grid';
}

// Use helper function if available
if (function_exists('lds_get_listing_gallery')) {
    $gallery_data = lds_get_listing_gallery($id);

    // vyhoď prázdné položky (bez URL nebo ID)
    $gallery_data = array_filter($gallery_data, function ($photo) {
        return ($photo['source'] === 'google' && !empty($photo['url']))
            || !empty($photo['id']);
    });

    // pokud chceš limit, změň 10 na jiný počet
    $limit = count($gallery_data);         // např. 10
    $gallery_data = array_slice(array_values($gallery_data), 0, $limit);

    foreach ($gallery_data as $photo) {
        $image_url = ($photo['source'] === 'google')
            ? $photo['url']
            : wp_get_attachment_image_url($photo['id'], $size);

        if (!empty($image_url)) {
            echo '<img src="' . esc_url($image_url) . '" alt="" class="slider-image-nl">';
        }
    }
    return;
}

// Original fallback code for compatibility
$gallery = (array) get_post_meta($id, '_gallery', true);
$ids = array_filter(array_keys($gallery));        // odstraní prázdná ID
$ids = array_slice($ids, 0, count($ids));         // zobrazí všechna
$ids = array_keys($gallery);
$slider_option = get_option('listeo_listings_gallery_slider', 'yes');
if($slider_option == 'disable'){
	$ids = array_slice($ids, 0, 1);
} else {
	$ids = array_slice($ids, 0, count($ids));
}
// Limit to 3 images


if (!empty($ids) && $ids[0] !== 0) {								
	foreach ($ids as $attachment_id) {
		if (!empty($attachment_id) && $attachment_id !== 0) {
			$image_url = wp_get_attachment_image_url($attachment_id, $size);
			if (!empty($image_url)) {
?>
				<img src="<?php echo esc_attr($image_url); ?>" alt="" class="slider-image-nl">
		<?php
			}
		}
	}
} else {
	// fallback - no gallery
	if (has_post_thumbnail()) {
		$image_url = get_the_post_thumbnail_url(get_the_ID(), $size);
	} else {
		$image_url = get_listeo_core_placeholder_image();
	}

	if (!empty($image_url)) {
		?>
		<img src="<?php echo esc_attr($image_url); ?>" alt="" class="slider-image-nl">
<?php
	}
}
?>