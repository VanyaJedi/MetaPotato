using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace MetaPotato.Models
{
    public class UserContext : IdentityDbContext<tblUser>
    {
        public DbSet<tblUser> tblUsers { get; set; }
        public DbSet<tblChatRoom> tblChatRooms { get; set; }
        public DbSet<tblMessage> tblMessages { get; set; }
        public UserContext(DbContextOptions<UserContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<tblChatRoomUser>()
                .HasKey(t => new { t.ChatRoomId, t.UserId });

            modelBuilder.Entity<tblChatRoomUser>()
                .HasOne(sc => sc.tblChatRoom)
                .WithMany(s => s.tblChatRoomUser)
                .HasForeignKey(sc => sc.ChatRoomId);

            modelBuilder.Entity<tblChatRoomUser>()
                .HasOne(sc => sc.tblUser)
                .WithMany(c => c.tblChatRoomUser)
                .HasForeignKey(sc => sc.UserId);
        }
    }
}
