using ExamToeicOnline_BackEnd_Clients.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamToeicOnline_BackEnd_Clients.EF.Configurations
{
    public class AnwserConfig: IEntityTypeConfiguration<Anwser>
    {
        public void Configure(EntityTypeBuilder<Anwser> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();
            

        }
    }
}
