using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TodoApp.Api.Models;

namespace TodoApp.Api.DataAccess.Configurations;

public class TodoItemConfiguration : IEntityTypeConfiguration<TodoItem>
{
    public void Configure(EntityTypeBuilder<TodoItem> builder)
    {
        builder.ToTable("TodoItems");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Text).HasMaxLength(500);
        builder.HasOne(x => x.List).WithMany(x => x.TodoItems).HasForeignKey(x => x.ParentId).IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}