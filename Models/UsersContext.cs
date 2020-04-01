using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MetaPotato.Models
{
    public class UserContext : DbContext
    {
        public DbSet<tblUser> tblUsers { get; set; }
        public DbSet<tblChatRoom> tblChatRooms { get; set; }
        public UserContext(DbContextOptions<UserContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
