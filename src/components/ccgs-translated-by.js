/**
 * External dependencies.
 */
import React from 'react';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { withDispatch, withSelect } = wp.data;
const { TextControl, PanelRow,FormTokenField } = wp.components;

/**
 * Meta description input component.
 *
 * @since 1.0.0
 */

class CcgsTranslatedBy extends React.Component {
	render() {
		return (
			<div className="metatags-browser-title-field">
				<PanelRow>
					<FormTokenField
						label={ __( 'Translated by' ) }
						value={ ( !this.props.metaFieldValue || this.props.metaFieldValue.length === 0?[]:this.props.metaFieldValue.split(',')) }
						suggestions={ this.props.users?.map(user=>user.nickname) || [] }
           				onChange={ (tokens)=>{ 
							
							this.props.setMetaFieldValue( Array.isArray(tokens) ?tokens.join(', '):'');
							}
						}
							
        			/>
				</PanelRow>
			</div>
		);
	}
}

export default compose( [
	withDispatch( ( dispatch ) => {
		return {
			setMetaFieldValue: ( value ) => {
				dispatch( 'core/editor' ).editPost( {
					meta: { _ccgs_translated_by: value },
				} );
			},
		};
	} ),
	withSelect( ( select ) => {
		return {
			metaFieldValue: select( 'core/editor' ).getEditedPostAttribute(
				'meta'
			)._ccgs_translated_by,
			users:select( 'core' ).getEntityRecords( 'root', 'user' ),
		};
	} ),
] )( CcgsTranslatedBy );