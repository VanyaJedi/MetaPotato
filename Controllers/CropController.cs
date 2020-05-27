using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MetaPotato.Models;
using System.IO;
using Microsoft.AspNetCore.Mvc;

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
        public ViewModelItem FViewModelItem;
       
        public class PersonViewModel
        {
            public string Name { get; set; }
            public IFormFile Avatar { get; set; }
        }
        public CropController(UserContext ADB)
        {
            FDB = ADB;
            FViewModelItem = null;
        }

       [HttpGet]
        public IActionResult Index()
        {
         //   if (AIsFile == null)
            {
                FViewModelItem = new ViewModelItem();
                tblUser xUser = FDB.tblUsers.FirstOrDefault(t => (t.Login == User.Identity.Name));
                if (xUser != null)
                {
                    FViewModelItem.Name = xUser.Login;
                    FViewModelItem.Photo = xUser.Photo;
                }

            }
            // return View(FDB.tblUsers.Where(p => p.Login == User.Identity.Name).ToList());
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
              //  FDB.SaveChanges();
            }
            return View("Index", FViewModelItem);
            Redirect("Index");
        }
    }
}
