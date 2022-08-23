using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TodoApp.Api.Models;

namespace TodoApp.Api.DataAccess.Configurations;

public class TodoListConfiguration : IEntityTypeConfiguration<TodoList>
{
    public void Configure(EntityTypeBuilder<TodoList> builder)
    {
        builder.ToTable("TodoLists");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).HasMaxLength(250);

        builder.HasMany(x => x.TodoItems).WithOne(x => x.List).HasForeignKey(x => x.ParentId);
        builder.Navigation(x => x.TodoItems).AutoInclude();
    }
}