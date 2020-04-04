using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using MetaPotato.Models;
using Microsoft.EntityFrameworkCore;

namespace MetaPotato.Controllers
{
    public class HomeController : Controller
    {
        /* private readonly ILogger<HomeController> _logger;

         public HomeController(ILogger<HomeController> logger)
         {
             _logger = logger;
         }
         */
        private UserContext db;
        public HomeController(UserContext context)
        {
            db = context;
        }


        [Authorize]
        public IActionResult Index()
        {

            var xContacts = db.tblUsers.Include(c => c.tblUserChatRoom).ThenInclude(sc => sc.tblChatRoom).ToList();
            var u = xContacts.FirstOrDefault(t => User.Identity.Name == t.Login);
            var cr = u.tblUserChatRoom.Select(sc => sc.tblChatRoom).ToList();
            string xToView = "Ваши контакты: ";
            foreach (tblChatRoom s in cr)
                xToView = xToView + ($"{s.ChatRoomName}" + " ,");
            ViewBag.ListContacts = xToView;
            ViewBag.Username = "Вы - " + User.Identity.Name;
           return View();
           //return Content(User.Identity.Name);
        }

        public IActionResult StartPage()
        {
            return View();
        }


        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
