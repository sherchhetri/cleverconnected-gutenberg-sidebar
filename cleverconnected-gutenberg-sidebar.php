<?php

/**
 * Plugin Name: cleverconnected gutenberg sidebar
 * Plugin URI:  https://cleverconnected.nl/
 * Description: Sidebar for the block editor as metadata. In post your can use meta data as shortcode(cc_reviewed_by and cc_translated_by).
 * Author: 		Ambition4Clients B.V.
 * Version  :   1.0.1
 * Author URI:  https://ambition4clients.nl/
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package         cleverconnected-gutenberg-sidebar
 */

/**
 * Class cleverconnectedGutenbergSidebar
 */
class cleverconnectedGutenbergSidebar
{

	const FIELDNAMES = [
		'_ccgs_hide_in_listing' => 'boolean',
		'_ccgs_reviewed_by'    => 'string',
		'_ccgs_translated_by'    => 'string',


	];

	/**
	 * Instance
	 *
	 * @var self
	 */
	private static $instance = null;

	/**
	 * Singleton instance.
	 *
	 * @return self
	 */
	public static function get_instance()
	{
		if (is_null(self::$instance)) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor
	 */
	public function __construct()
	{
		add_action('init', [$this, 'ccgs_settings_register_meta_fields']);
		add_action('enqueue_block_editor_assets', [$this, 'enqueue_scripts']);
		
		//short code for reviewed by and translated by
		add_shortcode("cc_reviewed_by",  [$this, "cc_reviewed_by_shortcode"]);
		add_shortcode("cc_translated_by",  [$this, "cc_translated_by_shortcode"]);
	}



	function cc_reviewed_by_shortcode($attrs, $content = null)
	{
		global $post;
		$reviewed_by  = get_post_meta($post->ID, "_ccgs_reviewed_by", true);
		return '<div class="ccgs-reviewed-by"> ' .  $reviewed_by  . '</div>';
	}
	function cc_translated_by_shortcode($attrs, $content = null)
	{
		global $post;
		$translated_by  = get_post_meta($post->ID, "_ccgs_translated_by", true);
		return '<div class="ccgs-translated-by"> ' .  $translated_by  . '</div>';
	}

	/**
	 * Register fields to the rest API.
	 */
	public function ccgs_settings_register_meta_fields()
	{
		foreach (self::FIELDNAMES as $fieldname => $type) {
			register_meta(
				'post',
				$fieldname,
				[
					'show_in_rest'  => true,
					'auth_callback' => fn() => true,
					'single'        => true,
					'type'          => $type,
				]
			);
		}
	}

	/**
	 * Enqueue Scripts
	 */
	public function enqueue_scripts()
	{
		if (get_current_screen()->post_type !== 'post') {
			return;
		}

		wp_enqueue_script(
			'ccgs-settings-sidebar-js',
			plugin_dir_url(__FILE__) . 'build/index.js',
			[
				'wp-plugins',
				'wp-edit-post',
				'wp-element',
				'wp-components',
				'wp-data',
				'wp-dom-ready',
			],
			filemtime(dirname(__FILE__) . '/build/index.js')
		);
	}
}

cleverconnectedGutenbergSidebar::get_instance();
