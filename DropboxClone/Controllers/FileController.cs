using DropboxClone.Models;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
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
        public List<FileModel> UploadFile(string path)
        {
            var uploadedFileNames = new List<string>();
            var filesList = new List<FileModel>();
            string userFolder = string.Format(@"\{0}", User.Identity.GetUserId());
            string sPath = ConfigurationManager.AppSettings["UserDataPath"] + userFolder + path;

            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;

            for (int i = 0; i < hfc.Count; i++)
            {
                if (hfc[i].ContentLength > 0)
                {
                    if (!File.Exists(sPath + Path.GetFileName(hfc[i].FileName)))
                    {
                        hfc[i].SaveAs(sPath + Path.GetFileName(hfc[i].FileName));;
                        uploadedFileNames.Add(hfc[i].FileName);
                    }
                }
            }

           var files = new DirectoryInfo(ConfigurationManager.AppSettings["UserDataPath"] + userFolder + path).GetFiles();

            foreach (var item in files)
            {
                if (uploadedFileNames.Contains(item.Name))
                {
                    filesList.Add(new FileModel { Name = item.Name, Path = path + item.Name, Extension = item.Extension, ModifiedDate = item.LastWriteTime.ToShortDateString() });
                }
            }

            return filesList;
        }

        [HttpPost]
        [Route("api/file/deletefile")]
        public IHttpActionResult DeleteFile(string path)
        {
            string userFolder = string.Format(@"\{0}", User.Identity.GetUserId());

            File.Delete(ConfigurationManager.AppSettings["UserDataPath"] + userFolder + path);

            return Ok(path.TrimEnd('\\').Split('\\').Last());
        }

        [HttpPost]
        [Route("api/file/renamefile")]
        public IHttpActionResult RenameFile(string oldPath, string newPath)
        {
            string userFolder = string.Format(@"\{0}", User.Identity.GetUserId());
            var sourcePath = (ConfigurationManager.AppSettings["UserDataPath"] + userFolder + oldPath);
            var targetPath = (ConfigurationManager.AppSettings["UserDataPath"] + userFolder + newPath);

            File.Move(sourcePath, targetPath);

            return Ok(new { oldName = oldPath.TrimEnd('\\').Split('\\').Last(), newName = newPath.TrimEnd('\\').Split('\\').Last(), newPath = newPath });
        }
    }
}