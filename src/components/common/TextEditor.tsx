import { Editor } from '@tinymce/tinymce-react';
import ReactS3Client from 'react-aws-s3-typescript';
import { Dispatch, SetStateAction, useRef } from 'react';
import { Utils } from 'utils/utils';
import { S3_PROJECT } from 'constants/app.constants';

interface Props {
  initValue?: string;
  setEditorValue: Dispatch<SetStateAction<string>>;
  dirName?: string;
}

export default function TextEditor({ setEditorValue, initValue,dirName }: Props) {
  const editorRef = useRef<any>(null);
  const typeRef = useRef<any>(null);

  const s3Config = {
    bucketName: "nam-dong",
    dirName: `${S3_PROJECT}/${dirName}`,
    region: "ap-southeast-1",
    accessKeyId: "123",
    secretAccessKey: "123",
  };

  const handleFilePicker = async (cb: Function, value: string, meta: any) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = async function () {
      const file = input.files?.[0];
      const s3 = new ReactS3Client(s3Config);
      try {
        if (file) {
          const fileName = `${Date.now()}-${Utils.formatVN(file.name)}`;
          const res = await s3.uploadFile(file, fileName);
          cb(res.location);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    input.click();
  };

  return (
    <Editor
      key={4}
      ref={editorRef}
      initialValue={initValue}
      init={{
        image_dimensions: false,
        image_class_list: [{ title: 'Responsive', value: 'img-responsive' }],
        height: 600,
        width: '100%',
        menubar: true,
        font_size_formats:
          '8px 9px 10px 11px 12px 14px 16px 18px 20px 24px 30px 36px 48px 60px 72px',
        plugins:
          'emoticons charmap help wordcount lists advlist insertdatetime anchor nonbreaking pagebreak charmap table codesample template media link image visualchars powerpaste preview importcss searchreplace autolink autosave save directionality code visualblocks ',

        toolbar:
          'undo redo print spellcheckdialog formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image addcomment showcomments   | checklist bullist numlist indent outdent | removeformat | alignleft aligncenter alignright alignjustify lineheight',
        toolbar_sticky: true,

        automatic_uploads: true,
        file_picker_callback: handleFilePicker,
        file_picker_types: 'image',
        image_caption: true,
        quickbars_selection_toolbar:
          'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_class: 'mceNonEditable',
        toolbar_mode: 'sliding',
        contextmenu: 'link image table',
        autosave_ask_before_unload: true,
        autosave_interval: '30s',
        autosave_prefix: '{path}{query}-{id}-',
        autosave_restore_when_empty: false,
        autosave_retention: '2m',
        image_advtab: true,

        font_family_formats:
          'TechSource=roboto; Andale Mono=andale mono,times; Arial=arial,roboto,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Impact=impact,chicago;  Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
        content_style:
          "@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'); body { font-family: Roboto, sans-serif; }",
      }}
      onEditorChange={(content: string) => {
        if (typeRef.current) {
          clearTimeout(typeRef.current);
        }
        typeRef.current = setTimeout(() => {
          setEditorValue(content);
        }, 500);
      }}
    />
  );
}
