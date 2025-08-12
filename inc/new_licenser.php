<?php

/**
 * Plugin Name: Listeo License
 * Description: This plugin is used to activate the license key for Listeo theme.
 * Version: 1.0
 * Author: Listeo
 * Author URI: https://themeforest.net/user/mikado-themes
 */


class ListeoVerifyLicense
{

  public $slug = "listeo";
  public $_token = "listeo";

  public $licenseKey;
  public $licenseEmail;
  public $settings = array();


  function __construct()
  {

    add_action('admin_print_styles', [$this, 'SetAdminStyle']);

    $this->licenseKey   = get_option("Listeo_lic_Key", "");
    $this->licenseEmail    = get_option("Listeo_lic_email", "");


    add_action('admin_init', array($this, 'verify_license_key'), 10);

    add_action('admin_menu', [$this, 'ActiveAdminMenu'], 99999);


    if (!empty($licenseKey) && !empty($this->settings)) {


      add_action('admin_post_Listeo_el_activate_license', [$this, 'action_activate_license']);
      add_action('admin_menu', [$this, 'InactiveMenu']);
    }
  }


  function get_license_info()
  {

    $last_verification_date = get_option('license_verificiation_date');
    $today = date("Y-m-d H:i:s");
    $diff = strtotime($today) - strtotime($last_verification_date);
    $diff_in_days = $diff / 60 / 60 / 24;
    // if license info is older than 20 day, get new info
    if ($diff_in_days > 20) {
      $license_info = $this->get_license_info_from_server();
    } else {
      return get_option('license_verification_info');
    }
    $license_key = get_option('Listeo_lic_Key');
    $response = wp_remote_post('https://phpstack-649281-3293337.cloudwaysapps.com/get_license_info', array(
      'body' => array(
        'license_key' => $license_key,
      ),
    ));


    if (is_wp_error($response)) {
      $error_message = $response->get_error_message();
      return $error_message;
    }

    $body = wp_remote_retrieve_body($response);
    
    $data = json_decode($body, true);

    if (isset($data['item']['description'])) {
      unset($data['item']['description']);
    }

    if ($data['status'] == 'success') {
      update_option('license_verificiation_date', date("Y-m-d H:i:s"));
      update_option('license_verification_info', $data);
      return $data;
    } else {
      return $data;
    }
  }

  function verify_license_key()
  {

    if (empty($_POST['listeo_action_verification']) || 'verification' != $_POST['listeo_action_verification'])
      return;


    if (!wp_verify_nonce($_POST['listeo_action_verification_nonce'], 'listeo_action_verification_nonce'))
      return;

    if (!current_user_can('manage_options'))
      return;

    if (!empty($_POST['el_license_key'])) {
      $license_key = sanitize_text_field($_POST['el_license_key']);
      // update_option('license_key', $license_key);
    } else {
      return;
    }

    if (!empty($_POST['el_license_email'])) {
      $license_email = sanitize_email($_POST['el_license_email']);
      //update_option('license_email', $license_email);
    }
    if (!empty($_POST['optin'])) {
      $optin = sanitize_text_field($_POST['optin']);
      //update_option('optin', $optin);
    } else {
      $optin = 'no';
    }

    $domain = $_SERVER['SERVER_NAME']; // Or any domain you need to verify
    // if domain is localhost, use IP address

    // get current theme version
    $theme = wp_get_theme();
    $theme_version = $theme->get('Version');

    $response = wp_remote_post('https://phpstack-649281-3293337.cloudwaysapps.com/verify', array(
      'body' => array(
        'license_key' => $license_key,
        'email' => $license_email,
        'domain' => $domain,
        'version' => $theme_version,
        'optin' => $optin,
      ),
    ));
    

    if (is_wp_error($response)) {
      $error_message = $response->get_error_message();
      update_option('license_verification_status', "error");
      update_option('license_verification_status_message', "Something went wrong: $error_message");
      delete_option('Listeo_lic_Key');
      delete_option('Listeo_lic_email');
      delete_option('license_verification_status');
      return;
    }

    $body = wp_remote_retrieve_body($response);
    $data = json_decode($body, true);
    

    if ($data['status'] !== 'success') {
      update_option('license_verification_status', 'error');
      update_option('license_verification_status_message', $data['message']);
      delete_option('Listeo_lic_Key', $license_key);
      delete_option('Listeo_lic_email', $license_email);
      delete_option('license_verification_status');
    } else {
      update_option('license_verification_status', 'verified');
      update_option('license_verification_info', $data['license_info']);
      update_option('license_verification_status_message', $data['message']);
      update_option('Listeo_lic_Key', $license_key);
      update_option('Listeo_lic_email', $license_email);
    }
  }



  function SetAdminStyle()
  {

    wp_register_style("ListeoLic", get_theme_file_uri("/css/admin.css"), 10);
    wp_enqueue_style("ListeoLic");
  }

  function ActiveAdminMenu()
  {

    //add_menu_page (  "Listeo", "Listeo", "activate_plugins", $this->slug, [$this,"Activated"], " dashicons-star-filled ");
    //add_submenu_page(  $this->slug, "Listeo License", "License Info", "activate_plugins",  $this->slug."_license", [$this,"Activated"] );
    add_submenu_page('listeo_settings', 'License', 'License', 'manage_options', $this->slug . "_license",  array($this, 'Activated'));
  }

  function InactiveMenu()
  {
    //add_menu_page( "Listeo", "Listeo", 'activate_plugins', $this->slug,  [$this,"LicenseForm"], " dashicons-star-filled " );
    add_submenu_page('listeo_settings', 'License', 'License', 'manage_options', $this->slug . "_license",  array($this, 'LicenseForm'));
  }

  function action_activate_license()
  {

    check_admin_referer('el-license');

    $licenseKey = !empty($_POST['el_license_key']) ? sanitize_text_field($_POST['el_license_key']) : "";
    $licenseEmail = !empty($_POST['el_license_email']) ? sanitize_email($_POST['el_license_email']) : "";

    update_option("Listeo_lic_Key", $licenseKey);
    update_option("Listeo_lic_email", $licenseEmail);
    update_option('_site_transient_update_themes', '');

    wp_safe_redirect(admin_url('admin.php?page=listeo_license'));
  }


  function action_deactivate_license()
  {

    check_admin_referer('el-license');



    update_option("Listeo_lic_Key", "") || add_option("Listeo_lic_Key", "");
    update_option('_site_transient_update_themes', '');

    wp_safe_redirect(admin_url('admin.php?page=listeo_license'));
  }

  function Activated()
  {


    $settings['general'] = array(
      'title'                 => __('<i class="fa fa-sliders-h"></i> General', 'listeo_core')
    );

    $settings['maps'] = array(
      'title'                 => __('<i class="fa fa-map-marked-alt"></i> Map Settings', 'listeo_core'),
    );

    $settings['submit_listing'] = array(
      'title'                 => __('<i class="fa fa-plus-square"></i> Submit Listing', 'listeo_core'),
    );

    $settings['listing_packages'] = array(
      'title'                 => __('<i class="fa fa-cubes"></i> Packages Options', 'listeo_core'),
    );

    $settings['single'] = array(
      'title'                 => __('<i class="fa fa-file"></i> Single Listing', 'listeo_core'),
    );

    $settings['booking'] = array(
      'title'                 => __('<i class="fa fa-calendar-alt"></i> Booking', 'listeo_core'),
    );
    $settings['browse'] = array(
      'title'                 => __('<i class="fa fa-search-location"></i> Browse Listing', 'listeo_core'),
    );

    $settings['registration'] = array(
      'title'                 => __('<i class="fa fa-user-friends"></i> Registration', 'listeo_core'),
    );

    $settings['pages'] = array(
      'title'                 => __('<i class="fa fa-layer-group"></i> Pages', 'listeo_core'),
    );

    $settings['emails'] = array(
      'title'                 => __('<i class="fa fa-envelope"></i> Emails', 'listeo_core'),
    );


    // Build page HTML
    $html = '<div class="wrap" id="' . $this->slug . '_settings">' . "\n";
    $html .= '<h2>' . __('Plugin Settings', 'listeo_core') . '</h2>' . "\n";

    $tab = '';
    if (isset($_GET['tab']) && $_GET['tab']) {
      $tab .= $_GET['tab'];
    }

    // Show page tabs
    if (is_array($settings) && 1 < count($settings)) {

      $html .= '<div id="listeo-core-ui"><div id="nav-tab-container"><h2 class="nav-tab-wrapper">' . "\n";

      $c = 0;
      foreach ($settings as $section => $data) {

        // Set tab class
        $class = 'nav-tab';


        // Set tab link

        $tab_link = add_query_arg(array('tab' => $section), menu_page_url('listeo_settings', false));
        if (isset($_GET['settings-updated'])) {
          $tab_link = remove_query_arg('settings-updated', $tab_link);
        }

        // Output tab
        $html .= '<a href="' . $tab_link . '" class="' . esc_attr($class) . '">' . ($data['title']) . '</a>' . "\n";

        ++$c;
      }

      $html .= '<a href="' . add_query_arg(array('tab' => 'license')) . '" class="nav-tab-active nav-tab"><i class="fa fa-check-circle"></i>License Information</a>' . "\n";
      $html .= '</h2></div>' . "\n";
    }

    //$html .= '<form method="post" action="options.php" enctype="multipart/form-data">' . "\n";

    // Get settings fields
    ob_start(); ?>
    <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
      <input type="hidden" name="action" value="Listeo_el_activate_license" />
      <h2>License Information</h2>


      <input type="hidden" name="action" value="Listeo_el_deactivate_license" />
      <div class="el-license-container">
        <?php
        
        if (get_option('license_verification_status') == 'verified') {
          $is_valid = true;
          $license_info = get_option('license_verification_info');
          
          if (empty($license_info)) {
            $license_info = $this->get_license_info();
          }
          if (isset($license_info['item']['description'])) {
            unset($license_info['item']['description']);
          }
        }
        ?>

        <ul class="el-license-info">
          <li>
            <div>
              <span class="el-license-info-title"><?php _e("Status:", $this->slug); ?></span>

              <?php if ($is_valid) : ?>
                <span class="el-license-valid"><?php _e("Valid", $this->slug); ?></span>
              <?php else : ?>
                <span class="el-license-valid invalid"><?php _e("Invalid", $this->slug); ?></span>
              <?php endif; ?>
            </div>
          </li>
          <?php
          if ($license_info) {
        
          ?>
            <li>
              <div>
                <span class="el-license-info-title"><?php _e("License Type:", $this->slug); ?></span>
                <a href="https://themeforest.net/licenses/standard"><?php echo $license_info['license']; ?></a>
              </div>
            </li>


            <?php $today = date("Y-m-d H:i:s");
            $supported_until = $license_info['supported_until'];
            $supported_until = date("F j, Y", strtotime($supported_until));
            if ($license_info['supported_until'] > $today) {  //valid 
            ?>
              <li>
                <div>
                  <span class="el-license-info-title"><?php _e("Support Ends on", $this->slug); ?></span>
                  <?php echo $supported_until; ?>
                  <a target="_blank" class="el-green-btn" href="https://themeforest.net/item/listeo-job-board-wordpress-theme/23239259/support/contact">Need Support? </a>
                  <?php

                  ?>
                </div>
              </li>
            <?php } else { ?>
              <li>
                <div>
                  <span class="el-license-info-title"><?php _e("Support Expired on", $this->slug); ?></span>
                  <?php echo $supported_until; ?>
                  <a target="_blank" class="el-blue-btn" href="https://themeforest.net/checkout/from_item/23239259?license=regular&size=source&support=renew_6month">Renew Support</a>
                  <?php

                  ?>
                </div>
              </li>
            <?php } ?>
          
            <li>
              <div>
                <span class="el-license-info-title"><?php _e("Purchased on:", $this->slug); ?></span>
                <?php echo date("F j, Y", strtotime($license_info['sold_at'])); ?>
              </div>
            </li>
            <li>
              <div>
                <span class="el-license-info-title"><?php _e("Your License Key:", $this->slug); ?></span>
                <?php $license_key = get_option('Listeo_lic_Key'); ?>
                <span class="el-license-key"><?php echo esc_attr(substr($license_key, 0, 9) . "XXXXXXXX-XXXXXXXX" . substr($license_key, -9)); ?></span>
              </div>
            </li>
          <?php } ?>


        </ul>

      </div>


      <?php wp_nonce_field('el-license'); ?>

    <?php $html .= ob_get_clean();

    $html .= '<p class="submit">' . "\n";
    $html .= '<input type="hidden" name="tab" value="' . esc_attr($tab) . '" />' . "\n";
    $html .= '<input name="Submit" type="submit" class="button-primary license-deactivate-btn" value="' . __('Deactivate License', 'listeo_core')  . '" />' . "\n";
    $html .= '</p>' . "\n";
    $html .= '</form></div>' . "\n";
    $html .= '</div>' . "\n";

    echo $html;
  }

  function LicenseForm()
  {


    $settings['general'] = array(
      'title'                 => __('<i class="fa fa-sliders-h"></i> General', 'listeo_core')
    );

    $settings['maps'] = array(
      'title'                 => __('<i class="fa fa-map-marked-alt"></i> Map Settings', 'listeo_core'),
    );

    $settings['submit_listing'] = array(
      'title'                 => __('<i class="fa fa-plus-square"></i> Submit Listing', 'listeo_core'),
    );

    $settings['listing_packages'] = array(
      'title'                 => __('<i class="fa fa-cubes"></i> Packages Options', 'listeo_core'),
    );

    $settings['single'] = array(
      'title'                 => __('<i class="fa fa-file"></i> Single Listing', 'listeo_core'),
    );

    $settings['booking'] = array(
      'title'                 => __('<i class="fa fa-calendar-alt"></i> Booking', 'listeo_core'),
    );
    $settings['browse'] = array(
      'title'                 => __('<i class="fa fa-search-location"></i> Browse Listing', 'listeo_core'),
    );

    $settings['registration'] = array(
      'title'                 => __('<i class="fa fa-user-friends"></i> Registration', 'listeo_core'),
    );

    $settings['pages'] = array(
      'title'                 => __('<i class="fa fa-layer-group"></i> Pages', 'listeo_core'),
    );

    $settings['emails'] = array(
      'title'                 => __('<i class="fa fa-envelope"></i> Emails', 'listeo_core'),
    );

    // Build page HTML
    $html = '<div class="wrap" id="' . $this->slug . '_settings">' . "\n";
    $html .= '<h2>' . __('Plugin Settings', 'listeo_core') . '</h2>' . "\n";

    $tab = '';
    if (isset($_GET['tab']) && $_GET['tab']) {
      $tab .= $_GET['tab'];
    }

    // Show page tabs
    if (is_array($settings) && 1 < count($settings)) {

      $html .= '<div id="listeo-core-ui"><div id="nav-tab-container"><h2 class="nav-tab-wrapper">' . "\n";

      $c = 0;
      foreach ($settings as $section => $data) {

        // Set tab class
        $class = 'nav-tab';


        // Set tab link

        $tab_link = add_query_arg(array('tab' => $section), menu_page_url('listeo_settings', false));
        if (isset($_GET['settings-updated'])) {
          $tab_link = remove_query_arg('settings-updated', $tab_link);
        }

        // Output tab
        $html .= '<a href="' . $tab_link . '" class="' . esc_attr($class) . '">' . ($data['title']) . '</a>' . "\n";

        ++$c;
      }

      $html .= '<a href="' . add_query_arg(array('tab' => 'license')) . '" class="nav-tab-active nav-tab"><i class="fa fa-check-circle"></i> License Activation</a>' . "\n";
      $html .= '</h2></div>' . "\n";
    }

    //$html .= '<form method="post" action="options.php" enctype="multipart/form-data">' . "\n";

    // Get settings fields
    ob_start(); ?>
      <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
        <input type="hidden" name="action" value="Listeo_el_activate_license" />
        <h2>Let's activate your license! 🙂</h2>

        <?php
        if (!empty($this->showMessage) && !empty($this->licenseMessage)) { ?>
          <div class="license-notification ">
            <p><?php
                if ($this->licenseMessage == 'You license key has been waiting for manual approval, Please contact with license author') {
                  echo 'Provided license key is already assigned to other domain. Deactivate it for that domain or purchase new license. If you want to activate it on dev/staging environment, please contact us about it via Support Tab on ThemeForest https://themeforest.net/item/listeo-job-board-wordpress-theme/23239259/support/contact';
                } else {
                  echo $this->licenseMessage;
                }
                ?></p>
          </div>
        <?php }  ?>
        <div class="license-info">You are allowed to use Listeo on one single finished site. If you want to use theme on a second domain you need to purchase a new license. <br> You will be able to deactivate in any time your license for this site and use it on another. </div>
        <table class="form-table license-form-div">
          <tbody>
            <tr class="listeo_settings_text">
              <th class="listeo_settings_text" scope="row"><?php _e("Your Purchase Code", $this->slug); ?>
                <span class="description"><a href="https://help.market.envato.com/hc/en-us/articles/202822600-Where-Is-My-Purchase-Code-" target="_blank">How to get purchase code?</a></span>
              </th>
              <td>
                <input type="text" class="regular-text code" name="el_license_key" size="50" placeholder="xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx" required="required">
              </td>
            </tr>
            <tr class="listeo_settings_text">
              <th class="listeo_settings_text" scope="row"><?php _e("Your ThemeForest Email Address", $this->slug); ?>
                <span class="description">This field is optional</span>
              </th>
              <td>
                <?php $purchaseEmail   = get_option("Listeo_lic_email", get_bloginfo('admin_email')); ?>
                <input type="text" class="regular-text code" name="el_license_email" size="50" value="<?php echo $purchaseEmail; ?>" placeholder="" required="required">
              </td>
            </tr>
          </tbody>
        </table>

        <?php wp_nonce_field('el-license'); ?>

        <?php $html .= ob_get_clean();

        $html .= '<p class="submit">' . "\n";
        $html .= '<input type="hidden" name="tab" value="' . esc_attr($tab) . '" />' . "\n";
        $html .= '<input name="Submit" type="submit" class="button-primary activate-license-btn" value="' . esc_attr(__('Activate License', 'listeo_core')) . '" />' . "\n";
        $html .= '</p>' . "\n";
        $html .= '</form></div>' . "\n";
        $html .= '</div>' . "\n";

        echo $html;
        ?>



    <?php
  }
}

new ListeoVerifyLicense();
