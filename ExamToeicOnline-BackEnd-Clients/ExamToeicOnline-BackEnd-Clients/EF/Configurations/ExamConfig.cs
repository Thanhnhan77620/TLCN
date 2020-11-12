using ExamToeicOnline_BackEnd_Clients.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamToeicOnline_BackEnd_Clients.EF.Configurations
{

    public class ExamConfig : IEntityTypeConfiguration<Exam>
    {
        public void Configure(EntityTypeBuilder<Exam> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();
            builder.HasMany(a => a.Parts).WithOne(u => u.Exam).HasForeignKey(x => x.ExamId).OnDelete(DeleteBehavior.NoAction);

        }
    }
}
