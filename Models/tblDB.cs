﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MetaPotato.Models
{
    // Таблица пользователей 
    public class tblUser
    {
        [Key]
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Login { get; set; }
        public int Status { get; set; }
        public byte[] Photo { get; set; }
        public List<tblChatRoomUser> tblChatRoomUsers { get; set; }

        public tblUser()
        {
            tblChatRoomUsers = new List<tblChatRoomUser>();
        }
    }

    // Таблица ChatRoom
    public class tblChatRoom
    {
        [Key]
        public int ChatRoomID { get; set; }
        public string ChatRoomName { get; set; }
        public int MaxUserNumber { get; set; }
        public bool IsLock { get; set; }
        public List<tblChatRoomUser> tblChatRoomUsers { get; set; }

        public tblChatRoom()
        {
            tblChatRoomUsers = new List<tblChatRoomUser>();
        }

    }

    // Связующая сущность для реализации отношения многие-ко-многим
    public class tblChatRoomUser
    {
        public int ChatRoomID { get; set; }
        public tblChatRoom tblChatRoom { get; set; }
        public int UserId { get; set; }
        public tblUser tblUser { get; set; }
    }
}
