using Dyspobelo.Models;
using System.Collections.Generic;
using Pomelo.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Dyspobelo.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        public DbSet<TestModel> Test { get; set; }
    }
}
