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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<tblUserChatRoom>()
                .HasKey(t => new { t.UserId, t.ChatRoomId });

            modelBuilder.Entity<tblUserChatRoom>()
                .HasOne(sc => sc.tblChatRoom)
                .WithMany(s => s.tblUserChatRoom)
                .HasForeignKey(sc => sc.ChatRoomId);

            modelBuilder.Entity<tblUserChatRoom>()
                .HasOne(sc => sc.tblUser)
                .WithMany(c => c.tblUserChatRoom)
                .HasForeignKey(sc => sc.UserId);
        }
    }
}
