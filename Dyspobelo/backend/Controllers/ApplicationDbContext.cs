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
    public DbSet<Dyspozytor> Dyspozytors { get; set; }
    public DbSet<Policja> Policja { get; set; }
    public DbSet<StrazPozarna> StrazPozarna { get; set; }
    public DbSet<Pogotowie> Pogotowie { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Zgloszenie>().ToTable("zgloszenie");
        modelBuilder.Entity<Zglaszajacy>().ToTable("zglaszajacy");
        modelBuilder.Entity<TypZgloszenia>().ToTable("typ_zgloszenia");
        modelBuilder.Entity<Klasa_Zgloszenia>().ToTable("klasa_zgloszenia");
        modelBuilder.Entity<Dyspozytor>().ToTable("dyspozytor");
        modelBuilder.Entity<Policja>().ToTable("policja");
        modelBuilder.Entity<StrazPozarna>().ToTable("straz_pozarna");
        modelBuilder.Entity<Pogotowie>().ToTable("pogotowie");
    }
}