import { S3_PROJECT } from 'constants/app.constants';
import ReactS3Client from 'react-aws-s3-typescript';
import { ITooltip } from '../@types/tooltip';

const MAXLENGTH = 50;

export const Utils = {
  formatVN(str: string) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    str = str.replace(/\s/g, '');
    return str;
  },

  downloadFile(url: string, fileName: string): void {
    const downloadUrl = window.URL.createObjectURL(new Blob([url]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
  },

  async uploadFile(
    file: any,
    dirName: string,
  ) {
    const fileName = `${Date.now()}-${Utils.formatVN(file?.name)}`;
    const config = {
      bucketName: "nam-dong",
      dirName: `${S3_PROJECT}/${dirName}`,
      region: "ap-southeast-1",
      accessKeyId: "123",
      secretAccessKey: "123",
    };

    const s3 = new ReactS3Client(config);

    try {
      const res = await s3.uploadFile(file, fileName);
      return res.location;
    } catch (err) {
      return null;
    }
  },

  async deleteFile(url: string, dirName: string, folder: string) {
    const startIndex = url.indexOf(folder);
    const filepath = url.substring(startIndex);
    const config = {
      bucketName: "nam-dong",
      dirName: `${S3_PROJECT}/${dirName}`,
      region: "ap-southeast-1",
      accessKeyId: "123",
      secretAccessKey: "123",
    };
    const s3 = new ReactS3Client(config);
    try {
      await s3.deleteFile(filepath);
    } catch (exception) {
      console.log(exception);
      /* handle the exception */
    }
  },
  setTooltip: (value: string, setValue: (agrs: ITooltip) => void) => {
    const isTooltip = value?.length > MAXLENGTH;
    if (isTooltip) {
      setValue({
        isTooltip: true,
        content: value.slice(0, MAXLENGTH).concat('...'),
      });
    }
  }

};

