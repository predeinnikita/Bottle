﻿using System.ComponentModel.DataAnnotations.Schema;

namespace Bottle.Models.DataBase
{
    public class BottleContent
    {
        public int Id { get; set; }
        public string Attachment { get; set; }

        public int BottleId { get; set; }
        public Bottle Bottle;

        public ContentType Type { get; set; }
    }
}