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
        private ChatManager chatManager;
        public HomeController(UserContext context)
        {
            db = context;
           chatManager = new ChatManager(context);
        }


        [Authorize]
        public IActionResult Index()
        { 
            // Построить список контактов (List<ContactItem>)
            var xContactList = chatManager.BuildContactList(User.Identity.Name);
            // Построить список контактов

            ViewBag.ListContacts = xContactList;
            ViewBag.Username = "Вы - " + User.Identity.Name;
            return View();
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
