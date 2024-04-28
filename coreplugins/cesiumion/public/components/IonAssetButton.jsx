import React, { PureComponent, Fragment } from "react";

import { DropdownButton, Dropdown, MenuItem } from "react-bootstrap";

import IonAssetLabel from "./IonAssetLabel";
import { AssetStyles } from "../defaults";

import "./IonAssetButton.scss";

export default class IonAssetButton extends PureComponent {
	static defaultProps = {
		assets: [],
		assetComponent: IonAssetLabel,
		onSelect: () => {}
	};

	handleClick = asset => () => this.props.onSelect(asset);

	render() {
		const {
			assets,
			onSelect,
			children,
			assetComponent: AssetComponent
		} = this.props;

		const menuItems = assets
			.sort((a, b) =>
				AssetStyles[a].name.localeCompare(AssetStyles[b].name)
			)
			.map(asset => (
				<Dropdown.Item
					key={asset}
					tag={"a"}
					onClick={this.handleClick(asset)}
				>
					<AssetComponent asset={asset} showIcon={true} />
				</Dropdown.Item>
			));

		const title = (
			<Fragment>
				<i className={"fa fa-cesium"} />
				{children}
			</Fragment>
		);

		return (
			<DropdownButton
				id={"cesiumIonUploadDropdown"}
				bsStyle={"primary"}
				bsSize={"small"}
				className={"ion-btn"}
				title={title}
			>
				{menuItems}
			</DropdownButton>
		);
	}
}
