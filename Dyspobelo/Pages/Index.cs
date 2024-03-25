using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Dyspobelo.Data;
using Dyspobelo.Models;

namespace Dyspobelo.Pages
{
    public class Index : PageModel
    {
        private readonly MyDbContext _context;

        public Index(MyDbContext context)
        {
            _context = context;
        }

        public IList<TestModel> TestModels { get; set; }

        public async Task OnGetAsync()
        {
            TestModels = await _context.Test.ToListAsync();
        }
    }
}