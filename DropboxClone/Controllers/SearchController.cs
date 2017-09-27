using DropboxClone.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DropboxClone.Controllers
{
    [Authorize]
    public class SearchController : ApiController
    {
        [HttpGet]
        [Route("api/search")]
        public List<FileModel> Search(string key)
        {
            var result = new List<FileModel>();
            string userFolder = string.Format(@"\{0}", User.Identity.GetUserId());
            string userFolderPath = ConfigurationManager.AppSettings["UserDataPath"] + userFolder;
            var files = Directory.GetFiles(userFolderPath, $"*{key}*.*", SearchOption.AllDirectories);

            foreach (var filePath in files)
            {
                var fileInfo = new FileInfo(filePath);
                result.Add(new FileModel { Name = fileInfo.Name, Path = filePath.Replace(userFolderPath, ""), Extension = fileInfo.Extension, ModifiedDate = fileInfo.LastWriteTime.ToShortDateString() });
            }

            return result;
        }
    }
}