using Microsoft.AspNet.Identity;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace DropboxClone.Controllers
{
    [Authorize]
    public class FileController : ApiController
    {
        [HttpGet]
        [Route("api/file/downloadfile")]
        public HttpResponseMessage DownloadFile(string path)
        {
            string userFolder = string.Format(@"\{0}", User.Identity.GetUserId());
            FileStream fs = new FileStream(ConfigurationManager.AppSettings["UserDataPath"] + userFolder + path, FileMode.Open);

            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);

            result.Content = new StreamContent(fs);
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            result.Content.Headers.ContentDisposition.FileName = Path.GetFileName(ConfigurationManager.AppSettings["UserDataPath"] + userFolder + path);
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            result.Content.Headers.ContentLength = fs.Length;

            return result;
        }

        [HttpPost]
        [Route("api/file/uploadfile")]
        public string UploadFile(string path)
        {
            int iUploadedCnt = 0;

            string userFolder = string.Format(@"\{0}", User.Identity.GetUserId());
            string sPath = ConfigurationManager.AppSettings["UserDataPath"] + userFolder + path;

            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;

            for (int i = 0; i < hfc.Count; i++)
            {
                if (hfc[i].ContentLength > 0)
                {
                    if (!File.Exists(sPath + Path.GetFileName(hfc[i].FileName)))
                    {
                        hfc[i].SaveAs(sPath + Path.GetFileName(hfc[i].FileName));
                        iUploadedCnt = iUploadedCnt + 1;
                    }
                }
            }

            if (iUploadedCnt > 0)
            {
                return iUploadedCnt + " Files Uploaded Successfully";
            }
            else
            {
                return "Upload Failed";
            }
        }

        [HttpPost]
        [Route("api/file/deletefile")]
        public IHttpActionResult DeleteFile(string path)
        {
            string userFolder = string.Format(@"\{0}", User.Identity.GetUserId());

            File.Delete(ConfigurationManager.AppSettings["UserDataPath"] + userFolder + path);

            return Ok();
        }

        [HttpPost]
        [Route("api/file/renamefile")]
        public IHttpActionResult RenameFile(string oldPath, string newPath)
        {
            string userFolder = string.Format(@"\{0}", User.Identity.GetUserId());
            var sourcePath = (ConfigurationManager.AppSettings["UserDataPath"] + userFolder + oldPath);
            var targetPath = (ConfigurationManager.AppSettings["UserDataPath"] + userFolder + newPath);

            File.Move(sourcePath, targetPath);

            return Ok();
        }
    }
}