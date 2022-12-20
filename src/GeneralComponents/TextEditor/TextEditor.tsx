import React, { useState } from "react";
import { connect } from "react-redux";
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/plugins/paste";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/table";
import "tinymce/plugins/directionality";
import "tinymce/plugins/anchor";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/code";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/help";
import "tinymce/plugins/preview";
import "tinymce/plugins/searchreplace";

import "tinymce/plugins/wordcount";
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.min.css";
import tinymce from "tinymce/tinymce";
import GymAccessControl from "../../GeneralComponents/GymAccessControl/GymAccessControl";
import { Editor } from "@tinymce/tinymce-react";
import { IApplicationState } from "../../Store/state";
import { routeActions } from "../../Actions/Route/action";
import { IRouteState } from "../../Actions/Route/model";
import { GridOptions } from "ag-grid-community";
import { useTranslation } from "react-i18next";

type IProps = typeof routeActions &
  IRouteState &
  GridOptions & {
    routeData: any;
    fileconfigurationid: string;
  };

const userAccessData = {
  create: { roles: ["Operator", "Manager"] },
};
const TextEditor = (props: IProps) => {
  const { routeData, fileconfigurationid } = props;
  const [t] = useTranslation();

  const [fileSelected, setFileSelected] = useState();
  const saveFileSelected = (e: any) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const toggledownloadFile = (fileRouteId: number) => {
    props.Helpdownloadfile(Number(fileRouteId));
  };
  const addHelpHandle = (fileRouteId: number) => {
    const mycontentEditor = tinymce.activeEditor.getContent({ format: "raw" });

    if (mycontentEditor == null) {
    }

    props.addHelpHandle(
      {
        fileConfigurationId: Number(fileconfigurationid),
        fileRouteId: fileRouteId,
        content: mycontentEditor,
        fileSelected,
      },
      fileconfigurationid
    );
  };

  return (
    <div
      className="tab-pane fade"
      id={"tabHelpContents" + routeData.id}
      role="tabpanel"
      aria-labelledby={routeData.id + "-tabHelpContents"}
    >
      <div className="d-flex flex-column" style={{ width: "100%" }}>
        <div className="col-10">
          <Editor
            tinymceScriptSrc={
              process.env.PUBLIC_URL +
              "/public/content/lib/tinymce/tinymce.min.js"
            }
            id={`Editor${routeData.id}`}
            initialValue={
              routeData.fileHelp != null ? routeData.fileHelp.content : ""
            }
            init={{
              skin: false,
              content_css: false,
              height: 500,
              menubar: "file edit view insert format tools table ",
              plugins: [
                "link image",
                "table paste",
                "directionality",
                "preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code",
              ],
              directionality: "ltr",
              toolbar:
                "ltr rtl |  formatselect |undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample ",
              toolbar_sticky: true,
              powerpaste_allow_local_images: true,
              powerpaste_word_import: "prompt",
              powerpaste_html_import: "prompt",
              branding: false,
            }}
          />
        </div>

        <div className="col-8">
          <GymAccessControl data={userAccessData.create}>
            <div className="row mt-2 px-3">
              <label className="text-info ml-3"> Help File : </label>
              <input
                className="text-info ml-3"
                type="file"
                accept=".pdf"
                onChange={saveFileSelected}
              />

              <button
                className="btn btn-info"
                onClick={() => toggledownloadFile(routeData.id)}
                disabled={routeData.fileHelp?.filename === null}
              >
                <span className="mdi mdi-18px mdi-plus-circle-outline mr-2"></span>
                {routeData.fileHelp?.filename != null
                  ? routeData.fileHelp.filename
                  : "Not File"}
              </button>
            </div>

            <div className="row mt-2 px-3">
              <button
                className="btn btn-info"
                onClick={() => addHelpHandle(routeData.id)}
              >
                <span className="mdi mdi-18px mdi-plus-circle-outline mr-2"></span>
                {t("save")}
              </button>
            </div>
          </GymAccessControl>
        </div>
      </div>
    </div>
  );
};
export default connect(
  (state: IApplicationState) => state.route,
  routeActions
)(TextEditor);
