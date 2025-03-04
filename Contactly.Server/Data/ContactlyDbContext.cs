﻿using Contactly.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Contactly.Server.Data
{
    public class ContactlyDbContext : DbContext
    {
        public ContactlyDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }
    }
}
