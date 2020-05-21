using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using MetaPotato.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace MetaPotato.Controllers
{
    public class HomeController : Controller
    {
        private ChatManager _chatManager;
        public HomeController(ChatManager chatManager)
        {
           _chatManager = chatManager;
        }


        [Authorize]
        public IActionResult Index()
        {
            // Построить список контактов (List<ContactItem>)
            var xContactList = _chatManager.BuildContactList(User.Identity.Name);

            // Передать во вьювер
            ViewBag.ListContacts = xContactList;
            ViewBag.Username = User.Identity.Name;

            return View();
        }

<<<<<<< HEAD


        public void Crop()
        {
            // Построить список контактов (List<ContactItem>)
            var xContactList = _chatManager.BuildContactList(User.Identity.Name);

            // Передать во вьювер
            ViewBag.ListContacts = xContactList;
            ViewBag.Username = User.Identity.Name;
        }

=======
>>>>>>> 2f95ab13f3e8bb94f9f428a228cdacb9d9f784c6
        public IActionResult StartPage()
        {
            return View();
        }

        public IActionResult UserProfile()
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
