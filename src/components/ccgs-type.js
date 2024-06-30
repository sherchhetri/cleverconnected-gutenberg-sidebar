/**
 * External dependencies.
 */
import React from 'react';

/**
 * WordPress dependencies.
 */
const { compose } = wp.compose;
const { withDispatch, withSelect } = wp.data;
const { RadioControl, PanelRow } = wp.components;

/**
 * Meta robots input component.
 *
 * @since 1.0.0
 */
class CcgsType extends React.Component {
	render() {
		return (
			<div className="metatags-browser-title-field">
				<PanelRow>
					<RadioControl
						className="ccgs-content-type"
						label="Ad content type"
						selected={
							this.props.metaFieldValue
								? this.props.metaFieldValue
								: 'none'
						}
						onChange={ this.props.setMetaFieldValue }
						options={ [
							{ label: 'None', value: 'none' },
							{
								label: 'Sponsored Content',
								value: 'sponsored-content',
							},
							{
								label: 'Partnered Content',
								value: 'partnered-content',
							},
							{
								label: 'Brought to you by',
								value: 'brought-to-you-by',
							},
						] }
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
					meta: { _ccgs_type: value },
				} );
			},
		};
	} ),
	withSelect( ( select ) => {
		return {
			metaFieldValue: select( 'core/editor' ).getEditedPostAttribute(
				'meta'
			)._ccgs_type,
		};
	} ),
] )( CcgsType );