using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MetaPotato.Models;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers;
//using System.Drawing.Common;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MetaPotato.Controllers
{
    public class ViewModelItem
    {
        public string Name { get; set; }
        public Byte[] Photo { get; set; }
    }
    public class CropController : Controller
    {
        private static UserContext FDB;
        private ChatManager FChatManager;
        public ViewModelItem FViewModelItem;
        public CropController(UserContext ADB, ChatManager chatManager)
        {
            FDB = ADB;
            FChatManager = chatManager;
            FViewModelItem = null;
        }

       [HttpGet]
        public IActionResult Index()
        {
            FViewModelItem = new ViewModelItem();
            tblUser xUser = FDB.tblUsers.FirstOrDefault(t => (t.Login == User.Identity.Name));
            if (xUser != null)
            {
                FViewModelItem.Name = xUser.Login;
                FViewModelItem.Photo = xUser.Photo;
            }
            FChatManager.SaveBytes(xUser.Photo, "C:/Metapotato/wwwroot/temp/" + User.Identity.Name + ".jpg");

            return View(FViewModelItem);
        }

        [HttpPost]
        public IActionResult Create(IFormFile Avatar)
        {
            // считываем переданный файл в массив байтов
            if (Avatar != null)
            {
                byte[] imageData = null;
                var xUser = FDB.tblUsers.FirstOrDefault(t => (t.Login == User.Identity.Name));
                using (var binaryReader = new BinaryReader(Avatar.OpenReadStream()))
                {
                    imageData = binaryReader.ReadBytes((int)Avatar.Length);
                }
                // установка массива байтов
                FViewModelItem = new ViewModelItem();
                FViewModelItem.Name = User.Identity.Name;
                FViewModelItem.Photo = imageData;

                FChatManager.SaveBytes(imageData, "C:/Metapotato/wwwroot/temp/" + User.Identity.Name + ".jpg");
            }
            return View("Index", FViewModelItem);
        }

        [HttpPost]
        public IActionResult CropSave(double X, double Y, double W, double H)
        {
            byte[] cropped = FChatManager.CroppedPicture("C:/Metapotato/wwwroot/temp/" + User.Identity.Name + ".jpg", (int) X, (int) Y, (int) W, (int) H);
            var xUser = FDB.tblUsers.FirstOrDefault(t => (t.Login == User.Identity.Name));
            xUser.Photo = cropped;
            FDB.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}
