using Dyspobelo.backend.Models;
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
    public DbSet<ZgloszenieJednostka> ZgloszenieJednostka { get; set; }
    public DbSet<Analityk> Analityk { get; set; }

    public DbSet<Komisariat> Komisariaty { get; set; } 
    public DbSet<Remiza> Remizy { get; set; } 
    public DbSet<Szpital> Szpitale { get; set; } 

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Zgloszenie>()
            .ToTable("zgloszenie")
            .HasOne<TypZgloszenia>()
            .WithMany()
            .HasForeignKey(z => z.id_typ_zgloszenia);

        modelBuilder.Entity<Zgloszenie>()
       .Property(z => z.numer_mieszkania)
       .IsRequired(false);

        modelBuilder.Entity<RaportZgloszenDto>().HasNoKey();
        modelBuilder.Entity<RaportUlicDTO>().HasNoKey();

        modelBuilder.Entity<Zglaszajacy>().ToTable("zglaszajacy");
        modelBuilder.Entity<TypZgloszenia>().ToTable("typ_zgloszenia");
        modelBuilder.Entity<Klasa_Zgloszenia>().ToTable("klasa_zgloszenia");
        modelBuilder.Entity<Dyspozytor>().ToTable("dyspozytor");
        modelBuilder.Entity<Policja>().ToTable("policja");
        modelBuilder.Entity<StrazPozarna>().ToTable("straz_pozarna");
        modelBuilder.Entity<Pogotowie>().ToTable("pogotowie");
        modelBuilder.Entity<ZgloszenieJednostka>().ToTable("zgloszenie_jednostka");
        modelBuilder.Entity<Analityk>().ToTable("analityk");

        modelBuilder.Entity<Komisariat>().ToTable("komisariat"); 
        modelBuilder.Entity<Remiza>().ToTable("remiza");
        modelBuilder.Entity<Szpital>().ToTable("szpital"); 
    }
}
