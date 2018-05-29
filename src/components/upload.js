import React from "react";

class Upload extends React.Component {
    componentDidMount(){
        $("#input-700").fileinput({
            theme: "fa",
            uploadUrl: "/file-upload-batch/2",
            maxFileCount: 1
        });
    }
    render() {
        return (
            <div className="file-loading">
                <input id="input-700" name="kartik-input-700[]" type="file" multiple />
            </div>
        );
    }
}

export default Upload;
