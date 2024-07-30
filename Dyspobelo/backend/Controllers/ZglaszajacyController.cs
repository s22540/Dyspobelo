using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class ZglaszajacyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ZglaszajacyController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Zglaszajacy
        [HttpPost]
        public async Task<ActionResult<Zglaszajacy>> PostZglaszajacy(Zglaszajacy zglaszajacy)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Zglaszajacy.Add(zglaszajacy);
            await _context.SaveChangesAsync();

            return Ok(zglaszajacy);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Zglaszajacy>> GetZglaszajacy(int id)
        {
            var zglaszajacy = await _context.Zglaszajacy.FindAsync(id);

            if (zglaszajacy == null)
            {
                return NotFound();
            }

            return zglaszajacy;
        }

        // PUT: api/Zglaszajacy/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutZglaszajacy(int id, Zglaszajacy zglaszajacyDto)
        {
            if (id != zglaszajacyDto.Id)
            {
                return BadRequest();
            }

            var existingZglaszajacy = await _context.Zglaszajacy.FindAsync(id);
            if (existingZglaszajacy == null)
            {
                return NotFound();
            }

            bool hasChanges = false;
            var properties = typeof(Zglaszajacy).GetProperties();
            foreach (var property in properties)
            {
                var dtoValue = property.GetValue(zglaszajacyDto);
                var entityValue = property.GetValue(existingZglaszajacy);

               
                if (dtoValue != null && !dtoValue.Equals(GetDefaultValue(property.PropertyType)))
                {
                    if (!Equals(dtoValue, entityValue))
                    {
                        property.SetValue(existingZglaszajacy, dtoValue);
                        hasChanges = true;
                    }
                }
            }

            if (hasChanges)
            {
                _context.Entry(existingZglaszajacy).State = EntityState.Modified;
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ZglaszajacyExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }

            return NoContent();
        }

        private object GetDefaultValue(Type type)
        {
            return type.IsValueType ? Activator.CreateInstance(type) : null;
        }

        private bool ZglaszajacyExists(int id)
        {
            return _context.Zglaszajacy.Any(e => e.Id == id);
        }
    }
}