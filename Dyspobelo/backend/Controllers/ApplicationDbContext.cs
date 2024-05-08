using backend.Controllers;
using Microsoft.EntityFrameworkCore;

    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Zgloszenie> Zgloszenia { get; set; }
        public DbSet<Zglaszajacy> Zglaszajacy { get; set; }
        public DbSet<TypZgloszenia> Typ_Zgloszenia { get; set; }
        public DbSet<Klasa_Zgloszenia> Klasa_Zgloszenia { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            
        }
    }

