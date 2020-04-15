using System;
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
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Login { get; set; }
        public int Status { get; set; }
        public byte[] Photo { get; set; }
        public List<tblChatRoomUser> tblChatRoomUser { get; set; }

        public tblUser()
        {
            tblChatRoomUser = new List<tblChatRoomUser>();
        }
    }

    // Таблица ChatRoom
    public class tblChatRoom
    {
        [Key]
        public int Id { get; set; }
        public string ChatRoomName { get; set; }
        public int UserNumber { get; set; }
        public bool IsLock { get; set; }
        public List<tblChatRoomUser> tblChatRoomUser { get; set; }

        public tblChatRoom()
        {
            tblChatRoomUser = new List<tblChatRoomUser>();
        }

    }

    // Связующая сущность для реализации отношения многие-ко-многим
   public class tblChatRoomUser
    {
        public int ChatRoomId { get; set; }
        public tblChatRoom tblChatRoom { get; set; }
        public int UserId { get; set; }
        public tblUser tblUser { get; set; }
        
        
    }

    // Таблица сообщений 
    public class tblMessage
    {
        [Key]
        public int messageId { get; set; }
        public string message { get; set; }
        public DateTime SendTime { get; set; }
        public int UserId { get; set; }
        public virtual tblUser tblUser { get; set; }
    }
}
