using ExamToeicOnline_BackEnd_Clients.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamToeicOnline_BackEnd_Clients.EF.Configurations
{
    public class PartConfig: IEntityTypeConfiguration<Part>
    {
        public void Configure(EntityTypeBuilder<Part> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();
            builder.HasMany(a => a.Questions).WithOne(u => u.Part).HasForeignKey(x => x.PartId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
