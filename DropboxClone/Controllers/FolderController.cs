using DropboxClone.Models;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web.Http;

namespace DropboxClone.Controllers
{
    [Authorize]
    public class FolderController : ApiController
    {
        [HttpGet]
        [Route("api/folder/getfolder")]
        public FolderModel GetFolder(string path)
        {
            string userFolder = string.Format(@"\{0}", User.Identity.GetUserId());
            var directory = new DirectoryInfo(ConfigurationManager.AppSettings["UserDataPath"] + userFolder + path);

            var directoryName = directory.Name;
            var directoryPath = path;
            var modifiedDate = directory.LastWriteTime.ToShortDateString();
            List<FolderModel> subFolders = new List<FolderModel>();
            List<FileModel> subfiles = new List<FileModel>();

            DirectoryInfo[] directories = directory.GetDirectories();
            FileInfo[] files = directory.GetFiles();

            foreach (var item in directories)
            {
                subFolders.Add(new FolderModel { Name = item.Name, Path = path + item.Name + @"\", ModifiedDate = item.LastWriteTime.ToShortDateString() });
            }

            foreach (var item in files)
            {
                subfiles.Add(new FileModel { Name = item.Name, Path = path + item.Name, Extension = item.Extension, ModifiedDate = item.LastWriteTime.ToShortDateString() });
            }

            FolderModel folder = new FolderModel { Name = directoryName, Path = directoryPath, Files = subfiles, SubFolders = subFolders, ModifiedDate = modifiedDate };
            return folder;
        }

        [HttpPost]
        [Route("api/folder/createfolder")]
        public IHttpActionResult CreateFolder(string path, string name)
        {
            string userFolder = string.Format(@"\{0}", User.Identity.GetUserId());

            var directory = Directory.CreateDirectory(ConfigurationManager.AppSettings["UserDataPath"] + userFolder + path + string.Format(@"\{0}", name));

            var folder = new FolderModel { Name = directory.Name, Path = path + directory.Name + @"\", ModifiedDate = directory.LastWriteTime.ToShortDateString() };

            return Ok(folder);
        }

        [HttpPost]
        [Route("api/folder/movefolder")]
        public IHttpActionResult MoveFolder(string oldPath, string newPath)
        {
            string userFolder = string.Format(@"\{0}", User.Identity.GetUserId());

            var sourcePath = (ConfigurationManager.AppSettings["UserDataPath"] + userFolder + oldPath).TrimEnd('\\', ' ');
            var targetPath = (ConfigurationManager.AppSettings["UserDataPath"] + userFolder + newPath).TrimEnd('\\', ' ');

            string destinationFolder = Path.Combine(targetPath, Path.GetFileName(sourcePath));

            Directory.Move(sourcePath, destinationFolder);

            return Ok(sourcePath.Split('\\').Last());
        }

        [HttpPost]
        [Route("api/folder/deletefolder")]
        public IHttpActionResult DeleteFolder(string path)
        {
            string userFolder = string.Format(@"\{0}", User.Identity.GetUserId());

            Directory.Delete(ConfigurationManager.AppSettings["UserDataPath"] + userFolder + path, true);

            return Ok(path.TrimEnd('\\').Split('\\').Last());
        }

        [HttpPost]
        [Route("api/folder/renamefolder")]
        public IHttpActionResult RenameFolder(string oldPath, string newPath)
        {
            string userFolder = string.Format(@"\{0}", User.Identity.GetUserId());
            var sourcePath = (ConfigurationManager.AppSettings["UserDataPath"] + userFolder + oldPath);
            var targetPath = (ConfigurationManager.AppSettings["UserDataPath"] + userFolder + newPath);

            Directory.Move(sourcePath, targetPath);

            return Ok(new { oldName = oldPath.TrimEnd('\\').Split('\\').Last(), newName = newPath.TrimEnd('\\').Split('\\').Last(), newPath = newPath });
        }
    }
}