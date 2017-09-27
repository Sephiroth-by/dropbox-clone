using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DropboxClone.Models
{
    public class FileModel
    {
        public string Path { get; set; }
        public string Name { get; set; }
        public string Extension { get; set; }
        public string ModifiedDate { get; set; }

    }
}