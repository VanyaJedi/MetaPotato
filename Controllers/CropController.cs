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
    public class CropController : Controller
    {

        private static UserContext FDB;
        public class PersonViewModel
        {
            public string Name { get; set; }
            public IFormFile Avatar { get; set; }
        }
        public CropController(UserContext ADB)
        {
            FDB = ADB;
        }
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View(FDB.tblUsers.ToList());
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
                xUser.Photo = imageData;
                FDB.SaveChanges();
            }
            return RedirectToAction("Index");
        }
    }
}
