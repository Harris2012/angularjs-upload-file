using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularjsUploadFile.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Demo1()
        {
            return View();
        }

        public ActionResult Demo2()
        {
            return View();
        }

        public ActionResult Demo3()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Upload()
        {
            UploadResponse response = new UploadResponse();
            if (Request.Files.Count == 0)
            {
                return Json(response);
            }

            var folder = Server.MapPath("~/upload");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            foreach (string item in Request.Files)
            {
                var name = Guid.NewGuid().ToString("D");
                var file = Request.Files[item];
                var extension = Path.GetExtension(file.FileName);
                var path = Path.Combine(folder, name + extension);
                file.SaveAs(path);

                response.Items.Add("/upload/" + name + extension);
            }

            return Json(response);
        }

        class UploadResponse
        {
            public List<string> Items { get; set; } = new List<string>();
        }
    }
}