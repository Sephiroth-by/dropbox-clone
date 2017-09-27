using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DropboxClone.Models
{
    public class FolderModel
    {
        public string Path { get; set; }
        public string Name { get; set; }
        public List<FolderModel> SubFolders { get; set; }
        public List<FileModel> Files { get; set; }
        public string ModifiedDate { get; set; }
    }
}