using Microsoft.EntityFrameworkCore;

public class ToDoDbContext : DbContext
{
    public ToDoDbContext(DbContextOptions<ToDoDbContext> options) : base(options) { }
    public DbSet<Item> Items { get; set; }
}