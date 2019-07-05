import React, {Component} from "react";
import { createBookmark } from "./../../actions";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Input from "./fields/Input";

class BookmarkForm extends Component {
    onFormSubmit = async (formValues) => {
        const { title, url } = formValues;
        await this.props.createBookmark(title, url);
        this.props.reset();
    }

    render() {
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onFormSubmit)}>
                <div>
                    <label>Title</label>
                    <Field
                        name="title"
                        component={Input}
                        type="text"
                    />
                </div>
                <div>
                    <label>Url</label>
                    <Field
                        name="url"
                        component={Input}
                        type="text"
                    />
                </div>
                <input type="submit" value="Create" />
            </form>
        );
    }
}

const WrappedBookmarkForm = reduxForm({
    form: "bookmark",
    validate: (formValues) => {
        const errors = {};

        if(!formValues.title) {
            errors.title = "Title is required";
        }

        if(!formValues.url) {
            errors.url = "Url is required";
        }

        return errors;
    }
})(BookmarkForm);

export default connect(null, { createBookmark })(WrappedBookmarkForm);