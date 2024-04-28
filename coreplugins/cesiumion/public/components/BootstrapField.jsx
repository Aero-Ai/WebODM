import { Formik, Field, getIn } from "formik";

import {
	FormGroup,
	FormLabel,
	FormControl,
	FormCheck,
	FormText 
} from "react-bootstrap";

const BootstrapFieldComponent = ({
	field,
	form: { touched, errors },
	label,
	help,
	type = "",
	showIcon = true,
	...props
}) => {
	const isError = getIn(errors, field.name) && getIn(touched, field.name);
	const errorMsg = getIn(errors, field.name);
	let ControlComponent = FormControl;

	const testType = type.toLowerCase();
	if (testType === "checkbox") ControlComponent = FormCheck;
	else if (testType === "textarea" || testType === "select")
		props.componentClass = testType;
	else props.type = type;

	return (
		<FormGroup
			controlId={field.name}
			validationState={isError ? "error" : null}
			style={{ marginLeft: 0, marginRight: 0 }}
		>
			{label && <FormLabel>{label}</FormLabel>}
			<ControlComponent {...field} {...props} />
			{isError && <FormText className="text-danger">{errorMsg}</FormText>}
			{help && !isError && <FormText className="text-muted">{help}</FormText>}
			{isError && showIcon && <FormControl.Feedback type="invalid" />}
		</FormGroup>
	);
};

const BootstrapField = props => (
	<Field component={BootstrapFieldComponent} {...props} />
);

export { BootstrapFieldComponent };
export default BootstrapField;
