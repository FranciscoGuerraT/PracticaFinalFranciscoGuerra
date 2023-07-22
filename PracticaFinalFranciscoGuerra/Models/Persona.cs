using System;
using System.Collections.Generic;

namespace PracticaFinalFranciscoGuerra.Models;

public partial class Persona
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public int? IsCompleted { get; set; }
}
