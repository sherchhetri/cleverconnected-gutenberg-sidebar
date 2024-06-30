/**
 * External dependencies.
 */
import React from 'react';

/**
 * Local dependencies.
 */

import CcgsHideInListing from './ccgs-hide-in-listing.js';
import CcgsReviewedBy from './ccgs-reviewed-by.js';
import CcgsTranslatedBy from './ccgs-translated-by.js';
import CcgsType from './ccgs-type.js';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { PluginSidebarMoreMenuItem, PluginSidebar } = wp.editPost;

const { PanelBody } = wp.components;
/**
 * Sidebar component voor the gutenberg editor.
 *
 * @since 1.0.0
 */
class Sidebar extends React.Component {
	render() {
		return (
			<>
				<PluginSidebarMoreMenuItem
					target="metatags-sidebar"
					icon="book"
				>
					{ __( 'Extra Options ERB', 'metatags' ) }
				</PluginSidebarMoreMenuItem>

				<PluginSidebar
					name="metatags-sidebar"
					title={ __( 'Extra Options', 'metatags' ) }
				>
					<PanelBody>
						<div className="metabox-sidebar-content">
							<CcgsHideInListing />
							<CcgsReviewedBy />
							<CcgsTranslatedBy/>
							{/* <CcgsType /> */}
						</div>
					</PanelBody>
				</PluginSidebar>
			</>
		);
	}
}

export default Sidebar;