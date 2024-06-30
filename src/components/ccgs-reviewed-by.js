/**
 * External dependencies.
 */
import React from 'react';
//import {React ,useState} from 'react';
/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { withDispatch, withSelect } = wp.data;
const { TextControl, PanelRow ,FormTokenField } = wp.components;

/**
 * Meta description input component.
 *
 * @since 1.0.0
 */



class CcgsReviewedBy extends React.Component {

//value={ this.props.metaFieldValue || '' }
// <TextControl
//						className="ccgs-reviewed-by"
//						label={ __( 'Reviewed by' ) }
//						value={ this.props.users?.map(user=>user.nickname) || '' }
//						onChange={ this.props.setMetaFieldValue }
//					/> 

	render() {
		return (
			<div className="metatags-browser-title-field">
				<PanelRow>
					
					<FormTokenField
						label={ __( 'Reviewed by' ) }
						value={ ( !this.props.metaFieldValue || this.props.metaFieldValue.length === 0?[]:this.props.metaFieldValue.split(',')) }
						suggestions={ this.props.users?.map(user=>user.nickname) || [] }
           				onChange={ (tokens)=>{ 
							//console.log('new token', JSON.stringify(tokens)) ;
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
				//console.log('review change:', value) ;
				dispatch( 'core/editor' ).editPost( {
					meta: { _ccgs_reviewed_by: value },
				} );
			},
		};
	} ),
	withSelect( ( select ) => {
		return {
			metaFieldValue: select( 'core/editor' ).getEditedPostAttribute(
				'meta'
			)._ccgs_reviewed_by,
			users:select( 'core' ).getEntityRecords( 'root', 'user' ),
		};
	} ),
] )( CcgsReviewedBy );