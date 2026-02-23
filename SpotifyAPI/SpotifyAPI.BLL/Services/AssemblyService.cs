using System.Reflection;
using SpotifyAPI.DAL;

namespace SpotifyAPI.BLL.Services
{
    public static class AssemblyService
    {
        public static string GetAssemblyName()
        {
            return typeof(AppDbContext).Assembly.GetName().Name!;
        }
    }
}