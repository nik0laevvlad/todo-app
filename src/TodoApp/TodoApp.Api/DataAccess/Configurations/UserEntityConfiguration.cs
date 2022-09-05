using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TodoApp.Api.Models;

namespace TodoApp.Api.DataAccess.Configurations;

public class UserEntityConfiguration : IEntityTypeConfiguration<UserEntity>
{
    public void Configure(EntityTypeBuilder<UserEntity> builder)
    {
        builder.ToTable("Users");

        builder.Property(x => x.Email).HasMaxLength(250).IsRequired();
        builder.Property(x => x.Username).HasMaxLength(250).IsRequired();
        builder.Property(x => x.Password).HasMaxLength(500).IsRequired();
    }
}